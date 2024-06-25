import AdminLayout from '@/Layouts/AdminLayout'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Container from "react-bootstrap/Container";
import { Head, useForm, router } from '@inertiajs/react';
import { styled } from '@mui/material/styles';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { utils, writeFileXLSX } from "xlsx";
import { Col, Row } from 'react-bootstrap';
import * as xlsx from 'xlsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';

function AllPosts(props) {
  const tbl = useRef(null);
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [rows, setrows] = useState([]);
  const [importcolumns, setimportcolumns] = useState(null);
  const [importrows, setimportrows] = useState([]);
  const [importModal, setimportModal] = useState(false);

  const StyledBox = styled('div')(({ theme }) => ({
    height: 480,
    width: '100%',
    '& .MuiDataGrid-cell--editing': {
      backgroundColor: 'rgb(255,215,115, 0.19)',
      color: '#1a3e72',
      '& .MuiInputBase-root': {
        height: '100%',
      },
    },
    '& .Mui-error': {
      backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
      color: theme.palette.error.main,
    },
  }));

  useEffect(() => {
    loadPosts();
  }, [startDate, endDate]);

  const loadPosts = () => {
    axios({
      method: "POST",
      url: route("admin.getdata"),
      data: {
        mode: "getAllPosts",
        startDate: startDate,
        endDate: endDate,
      },
    }).then(res => {
      const respmsg = res.data;
      setrows(respmsg);

    }).catch((error) => {
      alert(error);
    });
  }

  const columns = [
    { field: 'createddate', headerName: 'Date', width: 130, editable: true },
    { field: 'postname', headerName: 'Name', width: 350, editable: true },
    { field: 'price', headerName: 'Price', width: 70, editable: true },
    { field: 'authorname', headerName: 'Author', width: 170, editable: true },
    { field: 'publishername', headerName: 'Publisher', width: 250, editable: true },
    { field: 'freeshipping', headerName: 'Free Shipping', width: 150, editable: true },
    { field: 'quantity', headerName: 'In Stock', width: 100, editable: true },
    { field: 'active', headerName: 'Active', width: 120, type: 'boolean', editable: true },
    {
      field: 'action', headerName: 'Action', width: 120, type: 'actions', getActions: ({ id, row }) => {
        return [
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              onClick={() => window.location.href = '/admin/addpost/' + btoa(id)}
              label="Discard changes" />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Discard changes" />
          </>
        ]
      }
    },
  ];

  const UploadFile = () => {
    document.querySelector('#xlupload').click();
  }

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 }, { raw: false });
        const headers = json[0];
        const cols = headers.map((header, index) => ({
          field: header.toLowerCase(),
          headerName: header,
          width: 150,
          editable: true
        }));

        const rowData = json.slice(1).map((row, index) => {
          const rowObj = { id: index + 1 };
          row.forEach((value, i) => {
            rowObj[headers[i].toLowerCase()] = value;
          });
          return rowObj;
        });
        setimportcolumns(cols);
        setimportrows(rowData);
        setimportModal(true);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
    e.target.value = null;
  }

  const processRowUpdate = (params) => {
    const updatedRows = importrows.map((row) => (row.id === params.id ? { ...row, ...params } : row));
    setimportrows(updatedRows);
  }

  const onProcessRowUpdateError = () => { }

  const savePost = () => {
    router.post('/admin/saveposts', importrows)
  }

  return (
    <AdminLayout>
      <Container fluid>
        <Head title="All Posts" />
        <Row>
          <Col xs={12} lg={12}>
            <Row>
              <Col xs={3} lg={3}>
                {/* <h3>Posts&nbsp;<ControlPointRoundedIcon className='cursor-pointer' onClick={() => window.location.href = "/admin/addpost"} /></h3> */}
                <h3>Posts&nbsp;<ControlPointRoundedIcon className='cursor-pointer' onClick={UploadFile} /></h3>
                <input type="file" name="upload" id="xlupload" title='' className='d-none' onChange={readUploadFile} />
              </Col>
              <Col xs={{ span: 4, offset: 5 }} lg={{ span: 4, offset: 5 }}>
                <Row>
                  <Col xs={6} lg={6}>
                    <div className="dateftm">
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" id="newone">
                        <DemoContainer components={['DatePicker']} />
                        <DatePicker
                          label="From"
                          format="DD/MM/YYYY"
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(event, newValue) => setStartDate(event)}
                          value={startDate}
                        />
                      </LocalizationProvider>
                    </div>
                  </Col>
                  <Col xs={6} lg={6}>
                    <div className="dateftm">
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <DemoContainer components={['DatePicker']} />
                        <DatePicker
                          label="To"
                          format="DD/MM/YYYY"
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(event, newValue) => setEndDate(event)}
                          value={endDate}
                        />
                      </LocalizationProvider>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <hr />
      <table style={{ tableLayout: "fixed", width: "100%" }}>
        <tbody>
          <tr>
            <td>
              <div>
                <StyledBox>
                  <DataGrid rows={rows} columns={columns} editMode="row"
                    slots={{ toolbar: GridToolbar }}
                    // checkboxSelection
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        csvOptions: { utf8WithBom: true }
                      },
                    }} />

                </StyledBox>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        dialogClassName="my-modal"
        show={importModal}
        onHide={() => setimportModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataGrid getRowId={(importrows) => importrows.id} rows={importrows} columns={importcolumns} editMode='row' onProcessRowUpdateError={(error) => onProcessRowUpdateError(error)} processRowUpdate={processRowUpdate} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn1 px-3 fz-1' onClick={savePost}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  )
}

export default AllPosts