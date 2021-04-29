import React, { useState , useEffect, forwardRef} from 'react';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Edit from '@material-ui/icons/Edit';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import MaterialTable from 'material-table';
import Clear from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Check from '@material-ui/icons/Check';
import Input from '@material-ui/core/Input';


const tableIcons = 
{FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
}

const ResourceListView = ({ className, ...rest }) => {

  const [allResources, setAllResources] = useState([]);
  const [columns_array, setColsArray] = useState([]);
    useEffect(()=>{
      fetch('/api/getFullResources',{
      }).then(res=>res.json())
      .then(result=>{
          console.log("result = " , columns_array);

          if(result.resources[0]!=null)
          {
            var cols = Object.keys(result.resources[0])
            cols = cols.filter((item) => item !== "nick_name" &&  item !=="createdAt" && item !=="identifier" && item !== "used_quantity" &&  item !=="threshold_quantity" && item !=="purchased_quantity" && item !=="available_quantity");
            
            cols.map(x => {
                  columns_array.push({title : x , field : x})
              })
            console.log("Columns Array",cols)
            setAllResources(result.resources)
            
          }
        
      })
    },[])
  return (
    <div className = "dashBoard" >
        <hr/>
      <MaterialTable
        title="Resources Blueprint"
        columns={columns_array.map((c) => ({...c, tableData: undefined})) }
        data={allResources.map(item => Object.assign({}, item))} 
        icons = {tableIcons}   
        localization={{
          header: {
          actions: ''
          }}
        }
        options={{
          filtering: true,
          sorting: true,
          pageSize: 5,
          paginationType: "stepped",
          rowStyle: rowData => ({
            backgroundColor: (rowData.threshold_quantity > rowData.available_quantity) ? '#ffe2e2' : '#ddfada'
          })
        }}
      />
      </div>
  );
};

ResourceListView.propTypes = {
  className: PropTypes.string
};

export default ResourceListView;
