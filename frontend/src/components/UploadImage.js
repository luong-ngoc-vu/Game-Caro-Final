import React from 'react';
import {FormGroup, FormLabel, Button, FormControl} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {uploadImage} from '../actions/authentication';
import '../bootstrap.css';
import '../App.css';

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: '',
        };
        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFileChange(e) {
        this.setState({profileImg: e.target.files[0]})
    }

    handleSubmit(e) {
        e.preventDefault();
        const {profileImg} = this.state;
        // eslint-disable-next-line no-shadow
        const {uploadImage, history} = this.props;

        const formData = new FormData();
        formData.append('profileImg', profileImg);
        uploadImage(formData, history);
    }

    render() {
        return (
            <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="h2">Update Image Form</h2>
                    <br/>
                    <div className="form-group">
                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Upload an image</FormLabel>
                            <FormControl
                                type="file"
                                onChange={this.onFileChange}
                                name="profileImg"
                            />
                        </FormGroup>
                    </div>
                    <Button className="primary right-w3l" type="submit">
                        Upload Image
                    </Button>
                </form>
            </div>
        );
    }
}

UploadImage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    uploadImage: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types,react/forbid-prop-types
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {uploadImage}
)(withRouter(UploadImage));