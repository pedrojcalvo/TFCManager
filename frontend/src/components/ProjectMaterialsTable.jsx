import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getMaterialByProjectId } from '../services/material.services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const columns = [
  { id: 'material_id', label: 'ID', minWidth: 50 },
  { id: 'material_reference', label: 'Referencia', minWidth: 80 },
  { id: 'material_brand', label: 'Marca', minWidth: 100 },
  { id: 'material_description', label: 'Descripción', minWidth: 50},
  { id: 'material_pvp', label: 'Precio', minWidth: 100 },
  { id: 'material_ecotax', label: 'Ecotasa', minWidth: 50},
  { id: 'material_amount', label: 'Cantidad', minWidth:50},
  { id: 'total_cost', label: 'Precio total', minWidth:50},
  ];

export default function ProjectMaterialsTable() {

  const { id } = useParams();
  const projectId = id;

  const [projectMaterials, setProjectMaterials] = useState([]);
  useEffect( () =>{
      const getProjectMaterials = async(projectId) => {
        setProjectMaterials(await getMaterialByProjectId(projectId));
      }
      getProjectMaterials(projectId);
  }, [projectId]);

  console.log(projectMaterials)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projectMaterials.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((projectMaterial) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={projectMaterial.code}>
                    {columns.map((column) => {
                      const value = projectMaterial[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={projectMaterials.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
