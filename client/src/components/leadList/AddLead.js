import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    TextField,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { leadSources, leadStatuses } from '../../data/lead';
import { addLead } from '../../actions/leads';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

const AddLead = ({ addLead }) => {
    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        leadSource: 'Freelancer',
        leadStatus: 'OnBoard',
        leadIntent: 'LPA',
    });

    const {
        firstName,
        lastName,
        email,
        leadSource,
        leadStatus,
        leadIntent,
    } = formData;

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addLead(formData, history);
        // setFormData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     leadSource: 'Freelancer',
        //     leadStatus: 'OnBoard',
        //     leadIntent: 'LPA',
        // });
    };

    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => onSubmit(e)}
        >
            <div>
                <TextField
                    id="outlined-error"
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => onChange(e)}
                />
                <TextField
                    id="outlined-error-helper-text"
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => onChange(e)}
                />
                <TextField
                    id="outlined-error-helper-text"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div>
                <TextField
                    id="outlined-select-leadSource"
                    select
                    label="Select"
                    name="leadSource"
                    value={leadSource}
                    onChange={onChange}
                    helperText="Please select your Lead Source"
                    variant="outlined"
                >
                    {leadSources.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-leadSource"
                    select
                    label="Select"
                    name="leadStatus"
                    value={leadStatus}
                    onChange={(e) => onChange(e)}
                    helperText="Please select your Lead Status"
                    variant="outlined"
                >
                    {leadStatuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Purchase Intent</FormLabel>
                    <RadioGroup
                        aria-label="lead intent"
                        name="leadIntent"
                        value={leadIntent}
                        onChange={(e) => onChange(e)}
                    >
                        <FormControlLabel
                            value="LPA"
                            control={<Radio />}
                            label="LPA"
                        />
                        <FormControlLabel
                            value="HPA"
                            control={<Radio />}
                            label="HPA"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default connect(null, { addLead })(AddLead);
