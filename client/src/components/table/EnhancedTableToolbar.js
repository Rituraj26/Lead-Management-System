import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    Toolbar,
    makeStyles,
    lighten,
    Typography,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { deleteLeads } from '../../actions/leads';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = ({
    selectedLeads,
    deleteLeads,
    updateSelectedLeads,
}) => {
    const classes = useToolbarStyles();

    const deleteLeadsHandler = () => {
        deleteLeads(selectedLeads);
        updateSelectedLeads();
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: selectedLeads.length > 0,
            })}
        >
            {selectedLeads.length > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selectedLeads.length} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}

            {selectedLeads.length > 0 ? (
                <Tooltip title="Delete" onClick={deleteLeadsHandler}>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    selectedLeads: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        selectedLeads: ownProps.selectedLeads,
        updateSelectedLeads: ownProps.updateSelectedLeads,
    };
};

export default connect(mapStateToProps, { deleteLeads })(EnhancedTableToolbar);
