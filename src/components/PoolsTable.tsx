import {
  DataGrid,
  GridRowsProp,
  GridColDef
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getPools } from "../api/chainData";
import { PoolDataEntity } from "../types/PoolTypes";
import {
  filterLastFour,
  filterPercentageColor,
  formatPrice,
} from "../utils/numberFormats";
import { useSearchParams  } from 'react-router-dom';
import LinearProgress from "@mui/material/LinearProgress";

const columns: GridColDef[] = [
  { field: "name", headerName: "Pool", width: 220 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "txns", headerName: "TXNS", width: 150 },
  { field: "markers", headerName: "Markers", width: 150 },
  {
    field: "m5",
    headerName: "5M",
    width: 150,
    renderCell: filterPercentageColor,
  },
  {
    field: "h1",
    headerName: "1H",
    width: 150,
    renderCell: filterPercentageColor,
  },
  {
    field: "h6",
    headerName: "6H",
    width: 150,
    renderCell: filterPercentageColor,
  },
  {
    field: "h24",
    headerName: "24H",
    width: 150,
    renderCell: filterPercentageColor,
  },
  { field: "volume", headerName: "Volume", width: 150 },
  { field: "liquidity", headerName: "Liquidity", width: 150 },
  { field: "fdv", headerName: "FDV", width: 150 },
];

const PoolsTable = ({ network }: { network: string }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const urlPageNumber = searchParams.get('page');

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const test = (props: any) => {
    console.log(props);
    let urlProp = props.page+1;
    setSearchParams({page: urlProp});
    setPaginationModel(props);
    
  }

  useEffect(() => {

    if(urlPageNumber != null && paginationModel.page == 0 && parseInt(urlPageNumber) != 1){
      setPaginationModel({
        pageSize: 20,
        page: parseInt(urlPageNumber),
      });
    }

    const fetchData = async () => {

      setLoading(true);

      const rows = await getPools(network, paginationModel.page);

      const newRows: GridRowsProp = rows?.map((x: PoolDataEntity) => ({
        id: x.id,
        name: x.attributes.name,
        price: `$ ${filterLastFour(x.attributes.base_token_price_usd)}`,
        txns:
          x.attributes.transactions.h24.buys +
          x.attributes.transactions.h24.sells,
        volume: formatPrice(x.attributes.volume_usd.h24),
        markers: x.attributes.reserve_in_usd,
        m5: x.attributes.price_change_percentage.m5,
        h1: x.attributes.price_change_percentage.h1,
        h6: x.attributes.price_change_percentage.h6,
        h24: x.attributes.price_change_percentage.h24,
        liquidity: formatPrice(x.attributes.reserve_in_usd),
        fdv: formatPrice(x.attributes.fdv_usd),
      }));

      setRows(newRows);
      setLoading(false);
    };

    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    fetchData();

    return () => clearInterval(intervalId);
  }, [network, paginationModel]);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        {...rows}
        rows={rows}
        columns={columns}
        loading={loading}
        style={{ color: "#FFF", backgroundColor: "#050b11" }}
        paginationModel={paginationModel}
        onPaginationModelChange={test}
        slots={{
          loadingOverlay: LinearProgress,
          // footer: PaginationBar,
        }}

        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to }) => { return (`${from} - ${to}`)},
            sx: {
              color: "#FFF",
            },
            // labelDisplayedRows: ({ from, to, count }) =>
            //   `${from} - ${to} of ${
            //     count === Number.MAX_VALUE ? "many" : count
            // }`
          }
        }}
        paginationMode="server"
        pageSizeOptions={[]}
        rowCount={Number.MAX_VALUE}
      />
    </div>
  );
}

// const PaginationBar = () => {

//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);

//   return (
//     <div className="flex items-center justify-between px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between gap-2">
//         <button
//           onClick={() => apiRef.current.setPage(page - 1)}
//           className="  rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-gray-700"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => apiRef.current.setPage(page + 1)}
//           className="  rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-gray-700"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };


export default PoolsTable;