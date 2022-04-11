// Imports
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Store
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { login, clearStatus } from '../../features/user/userSlice';

// Styles
import './style.scss';

// antd
import { Layout, Row, Col, Typography, Form, Input, Button, Alert } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

// antd variables
const { Content } = Layout;
const { Title } = Typography;

// Element
function Signup() {
	// Rooter
	const navigate = useNavigate();

	// Hooks
	const [form] = Form.useForm();

	// Redux
	const { apiStatus, apiMessage } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	// Functions
	// In first load clear api status
	useEffect(() => {
		dispatch(clearStatus);
		// eslint-disable-next-line
	}, []);

	// After login redirect to packages page
	useEffect(() => {
		if (apiStatus === 'succeeded') {
			dispatch(clearStatus());
			navigate('/packages');
		}
		// eslint-disable-next-line
	}, [apiStatus]);

	// Handle Signup
	function handleSignup(values: { fullName: string; email: string }): void {
		// Redux Login Dispatch
		if (apiStatus === 'idle') {
			dispatch(login({ ...values }));
		}
	}

	// Element
	return (
		<Layout className="signup-layout">
			<Content className="signup-content">
				<Row className="signup-row" justify="center" align="middle" gutter={30}>
					<Col className="signup-col" xs={20} md={8}>
						<div className="signup">
							{apiMessage && (
								<Alert
									message={apiMessage}
									type="error"
									showIcon
									style={{ marginBottom: 20 }}
								/>
							)}

							<Title
								className="signup__title"
								level={1}
								style={{ textAlign: 'center' }}
							>
								Giriş Yapın
							</Title>
							<Form
								form={form}
								className="signup-form"
								name="signup-form"
								layout="vertical"
								onFinish={handleSignup}
							>
								<Form.Item
									name="fullName"
									label="Adınız ve Soyadınız"
									rules={[
										{
											required: true,
											message: 'Lütfen adınızı ve soyadınızı giriniz!',
										},
									]}
								>
									<Input
										prefix={<UserOutlined />}
										placeholder="Adınız ve Soyadınız"
									/>
								</Form.Item>

								<Form.Item
									name="email"
									label="E-mail"
									rules={[
										{
											type: 'email',
											message:
												'Lütfen e-mail adresinizi geçerli bir formatta giriniz.',
										},
										{
											required: true,
											message: 'Lütfen e-mail adresinizi giriniz.',
										},
									]}
								>
									<Input prefix={<MailOutlined />} placeholder="E-mail" />
								</Form.Item>

								<Form.Item noStyle>
									<Button
										className="signup-form__button"
										type="primary"
										htmlType="submit"
										block
										loading={apiStatus === 'loading' ? true : false}
									>
										Devam Et
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default Signup;
