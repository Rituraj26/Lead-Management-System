import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';
import {
    makeStyles,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Typography,
    Grid,
    Paper,
    Box,
} from '@material-ui/core';

import { flexbox } from '@material-ui/system';

import { red } from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    expandBlock: {
        flexGrow: 1,
    },
    borderRight: {
        borderRight: '1px solid red',
    },
}));

const ViewLead = ({ leads }) => {
    const classes = useStyles();
    const params = useParams();
    console.log(params);
    const lead = leads.find((lead) => lead.id === parseInt(params.leadId));

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid item md={4} className={classes.borderRight}>
                        <img
                            className={classes.img}
                            style={{ width: '100%' }}
                            alt="complex"
                            src="https://www.gettyimages.in/gi-resources/images/500px/983794168.jpg"
                        />

                        <Typography gutterBottom variant="subtitle1">
                            Standard license
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Full resolution 1920x1080 • JPEG
                        </Typography>
                    </Grid>
                    <Grid item md={8} container direction="column">
                        <Grid
                            item
                            className={classes.expandBlock}
                            style={{ borderBottom: '1px solid red' }}
                        >
                            <Typography gutterBottom variant="h6">
                                Contact Info
                            </Typography>
                            <Grid container>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.id}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.email}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Email
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            className={classes.expandBlock}
                            style={{ borderBottom: '1px solid red' }}
                        >
                            <Typography gutterBottom variant="h6">
                                Lead Info
                            </Typography>
                            <Grid container>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Lead Source
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.leadSource}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Lead Status
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.leadStatus}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Lead Intent
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.leadIntent}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.expandBlock}>
                            <Typography gutterBottom variant="h6">
                                Comments
                            </Typography>
                            <Grid container>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.id}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {lead.email}
                                    </Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Email
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Email
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => {
    const leads = state.Leads.leads;
    return {
        leads: leads,
    };
};

export default connect(mapStateToProps)(ViewLead);
