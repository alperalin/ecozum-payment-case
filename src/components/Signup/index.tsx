// Imports

// Styles
import './Signup.scss';

// Antd
import { Layout, Row, Col, Typography, Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Title } = Typography;

// Component
function Signup() {
	// Hooks
	const [form] = Form.useForm();

	// Handle Signup
	function handleSignup(values: { fullName: string; email: string }): void {
		console.log(values);
	}

	// Element
	return (
		<Layout className="layout">
			<Content>
				<Row justify="center" align="middle">
					<Col className="signup" xs={24} md={12}>
						<Title
							className="signup__title"
							level={1}
							style={{ textAlign: 'center' }}
						>
							Bilgilerinizi Giriniz
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
								>
									Devam Et
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default Signup;
