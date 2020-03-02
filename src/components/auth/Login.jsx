import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import LoginForm from '../form/LoginForm';
import Sidebar from './Sidebar';
import Spinner from '../common/Spinner';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: 'test@gmail.com',
            password: 'tester123',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
            this.props.auth.loading = false;
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }
    render() {
        const { errors } = this.state;
        const { loading } = this.props.auth;
        let loginLoading;
        if (loading) {
            loginLoading = <Spinner />
        } else {
            loginLoading = (
                <div className="save-stngs pd2">
                    <ul style={{textAlign: "center"}}>
                        <li ><button type="submit" style={{marginBottom:"10px"}}>Đăng nhập</button></li>
                    </ul>
                    <a style={{paddingLeft:"450px"}} href="">Quên mật khẩu?</a>
                </div>
            )
        }
        return (
            <section className="profile-account-setting">
                <div className="container">
                    <div className="account-tabs-setting">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-9">
                                <div className="tab-content">
                                    <div className="acc-setting">
                                        <h3 style={{textAlign: "center"}}>Đăng nhập</h3>
                                        <h3 style={{textAlign: "center"}}>Tài khoản test</h3>
                                        <p style={{textAlign: "center"}}>E-mail: test@gmail.com</p>
                                        <p style={{textAlign: "center"}}>Password: tester123</p>
                                        <form onSubmit={this.onSubmit}>
                                            <LoginForm
                                                label="E-mail"
                                                name="email"
                                                placeholder="E-mail tài khoản"
                                                icon="fa fa-user"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                                error={errors.email}
                                            />
                                            <LoginForm
                                                label="Mật khẩu"
                                                name="password"
                                                type="password"
                                                placeholder="Mật khẩu tài khoản"
                                                icon="fa fa-lock"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                                error={errors.password}
                                            />
                                            {loginLoading}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
