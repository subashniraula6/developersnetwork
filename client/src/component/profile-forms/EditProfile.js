import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createProfile, getCurrentProfile } from '../../actions/profile.actions'
import { Link, withRouter } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { Button, TextField, Select, MenuItem, TextareaAutosize } from '@material-ui/core'

const EditProfile = ({ profile: { profile, isLoading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        bio: '',
        status: '',
        githubusername: '',
        skills: '',
        youtube: '',
        facebook: '',
        linkedin: '',
        twitter: '',
        instagram: '',
    });

    const [addSocialNetworkLinks, setSocialNetworkLinks] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: isLoading          || !profile.company ? '' : profile.company,
            website: isLoading          || !profile.website ? '' : profile.website,
            location: isLoading         || !profile.location? '' : profile.location,
            bio: isLoading              || !profile.bio     ? '' : profile.bio,
            status: isLoading           || !profile.status  ? '' : profile.status,
            githubusername: isLoading   || !profile.githubusername ? '' : profile.githubusername,
            skills: isLoading           || !profile.skills ? '' : profile.skills.join(','),
            youtube: isLoading          || !profile.social  || !profile.social.youtube      ? '' : profile.social.youtube,
            facebook: isLoading         || !profile.social  || !profile.social.facebook     ? '' : profile.social.facebook,
            linkedin: isLoading         || !profile.social   || !profile.social.linkedin     ? '' : profile.social.linkedin,
            twitter: isLoading          || !profile.social  || !profile.social.twitter      ? '' : profile.social.twitter,
            instagram: isLoading        || !profile.social  || !profile.social.instagram    ? '' : profile.social.instagram,
        })
    }, [isLoading, getCurrentProfile]);

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        linkedin,
        twitter,
        instagram,
    } = formData;

    const handleChange = event => {
        const { name, value } = event.target;
        return setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        createProfile(formData, history, true);
    }

    return isLoading ? (<Spinner />) :
        (
            <Fragment>
                <h1 className="large text-primary">
                    Create Your Profile
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i>
                    Let's get some information to make your profile stand out
                </p>
                <small>* = required field</small>
                <form className="form">
                    <div className="form-group">
                        <Select name="status" value={status} onChange={(e) => handleChange(e)}>
                            <MenuItem value={'0'}>* Select Professional Status</MenuItem>
                            <MenuItem value={"Developer"}>Developer</MenuItem>
                            <MenuItem value={"Junior Developer"}>Junior Developer</MenuItem>
                            <MenuItem value={"Senior Developer"}>Senior Developer</MenuItem>
                            <MenuItem value={"Manager"}>Manager</MenuItem>
                            <MenuItem value={"Student or Learning"}>Student or Learning</MenuItem>
                            <MenuItem value={"Instructor"}>Instructor or Teacher</MenuItem>
                            <MenuItem value={"Intern"}>Intern</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        <small className="form-text"
                        >Give us an idea of where you are at in your career</small
                        >
                    </div>
                    <div className="form-group">
                        <TextField variant='standard' type="text" label="Company" name="company" value={company} onChange={(e) => handleChange(e)} />
                        <small className="form-text"
                        >Could be your own company or one you work for</small
                        >
                    </div>
                    <div className="form-group">
                        <TextField type="url" label="Website" name="website" value={website} onChange={(e) => handleChange(e)} />
                        <small className="form-text"
                        >Could be your own or a company website</small
                        >
                    </div>
                    <div className="form-group">
                        <TextField type="text" label="Location" name="location" value={location} onChange={(e) => handleChange(e)} />
                        <small className="form-text"
                        >City and state suggested (eg. Boston, MA)</small
                        >
                    </div>
                    <div className="form-group">
                        <TextField type="text" label="* Skills" name="skills" value={skills} onChange={(e) => handleChange(e)} />
                        <small className="form-text"
                        >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                        >
                    </div>
                    <div className="form-group">
                        <TextField
                            type="text"
                            label="Github Username"
                            name="githubusername"
                            value={githubusername}
                            onChange={(e) => handleChange(e)}
                        />
                        <small className="form-text"
                        >If you want your latest repos and a Github link, include your
            username</small
                        >
                    </div>
                    <div className="form-group">
                        <TextareaAutosize rowsMin={3} label="A short bio of yourself" name="bio" value={bio} onChange={(e) => handleChange(e)}></TextareaAutosize>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light" onClick={(e) => setSocialNetworkLinks(!addSocialNetworkLinks)}>
                            Add Social Network Links
          </button>
                        <span>Optional</span>
                        {addSocialNetworkLinks && (
                            <Fragment>
                                <div className="form-group social-input">
                                    <i className="fab fa-twitter fa-2x"></i>
                                    <TextField variant='filled' type="url" label="Twitter URL" name="twitter" value={twitter} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-facebook fa-2x"></i>
                                    <TextField variant='filled' type="url" label="Facebook URL" name="facebook" value={facebook} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-youtube fa-2x"></i>
                                    <TextField variant='filled' type="url" label="YouTube URL" name="youtube" value={youtube} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                    <TextField variant='filled' type="url" label="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="form-group social-input">
                                    <i className="fab fa-instagram fa-2x"></i>
                                    <TextField variant='filled' type="url" label="Instagram URL" name="instagram" value={instagram} onChange={(e) => handleChange(e)} />
                                </div>
                            </Fragment>
                        )}
                    </div>
                    <Button variant='contained' color='primary' type="submit" className="btn btn-primary my-1" onClick={(e) => handleSubmit(e)}> Submit </Button>
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </Fragment>
        )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profileReducer
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));