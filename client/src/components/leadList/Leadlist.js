import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    Checkbox,
    TextField,
    Button,
} from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import EnhancedTableHead from '../table/EnhancedTableHead';
import EnhancedTableToolbar from '../table/EnhancedTableToolbar';
import { getLeads } from '../../actions/leads';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    search: {
        display: 'flex',
        alignContent: 'start',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),
    },
    iconColor: {
        opacity: '0.54',
        cursor: 'pointer',
    },
}));

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const LeadsList = ({ leads, getLeads }) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getLeads();
    }, [getLeads]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = leads.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selectedIndex.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleLeadViewHandler = (leadId) => {
        history.push(`/leads/${leadId}`);
    };

    const handleEditHandler = (leadId) => {
        history.push(`/leads/${leadId}/edit`);
    };

    const updateSelectedLeads = () => {
        setSelected([]);
    };

    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <TextField
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ type: 'search' }}
                />
                <Link to={'/leads/add'}>
                    <Button variant="contained" color="primary">
                        Add New Lead
                    </Button>
                </Link>
            </div>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    selectedLeads={selected}
                    updateSelectedLeads={updateSelectedLeads}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={leads.length}
                        />
                        <TableBody>
                            {leads.length ? (
                                stableSort(leads, getComparator(order, orderBy))
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((lead) => {
                                        const isItemSelected = isSelected(
                                            lead.id
                                        );

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(event, lead.id)
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={lead.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby':
                                                                lead.id,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={lead.id}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {lead.id}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {lead.firstName}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {lead.lastName}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {lead.email}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {lead.leadSource}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {lead.leadStatus}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {lead.leadIntent}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <VisibilityIcon
                                                        className={
                                                            classes.iconColor
                                                        }
                                                        onClick={() =>
                                                            handleLeadViewHandler(
                                                                lead.id
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <EditIcon
                                                        className={
                                                            classes.iconColor
                                                        }
                                                        onClick={() =>
                                                            handleEditHandler(
                                                                lead.id
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <Fragment></Fragment>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={leads.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        leads: state.Leads.leads,
    };
};

export default connect(mapStateToProps, { getLeads })(LeadsList);
