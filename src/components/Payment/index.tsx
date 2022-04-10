// import
import MaskedInput from 'antd-mask-input';

// antd
import { Layout, Row, Col, Typography, Button, List, Form, Input } from 'antd';
import {
	UserOutlined,
	CreditCardOutlined,
	CalendarOutlined,
} from '@ant-design/icons';

// Styles
import './Payment.scss';

// Component
import Header from '../Header';
const { Content } = Layout;
const { Title } = Typography;

function Payment() {
	// antd state
	const [form] = Form.useForm();

	// data
	const data = {
		cart: [
			{
				id: 1,
				name: 'Paket Adı 1',
				amount: 200,
				currency: '₺',
			},
			{
				id: 4,
				name: 'Paket Adı 4',
				amount: 100,
				currency: '₺',
			},
			{
				id: 6,
				name: 'Paket Adı 5',
				amount: 421,
				currency: '₺',
			},
		],
		agreement:
			'<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti iure ex, explicabo aliquam quae esse maiores voluptas? Dignissimos itaque, suscipit amet ipsa tempore libero obcaecati velit eaque rerum, dolore minus.</p><p>	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem et, ratione minus, esse quaerat cum eveniet ipsum sed asperiores fugit odio eaque rerum autem enim explicabo amet perspiciatis, praesentium nesciunt.</p>',
	};

	// function
	function checkCreditCard(_: any, value: any) {
		const trimmedValue = value.replace(/\D+/g, '');

		if (trimmedValue && trimmedValue.length === 16) return Promise.resolve();

		return Promise.reject(new Error('Lütfen kart numarasını giriniz'));
	}

	function handlePayment(values: any) {
		console.log(values);
	}

	return (
		<Layout className="payment">
			<Header />
			<Content className="payment__content">
				<Row className="payment__row" justify="center" align="top" gutter={30}>
					<Col className="payment__column" xs={20} md={14}>
						<div className="payment-card">
							<Title level={1}>Kart Bilgileri</Title>
							<Form
								form={form}
								className="payment-form"
								name="payment-form"
								layout="vertical"
								onFinish={handlePayment}
							>
								<Form.Item
									name="cardHolderName"
									label="Kart Sahibinin ismi"
									rules={[
										{
											required: true,
											message: 'Lütfen kart sahibinin ismini giriniz!',
										},
									]}
								>
									<Input prefix={<UserOutlined />} placeholder="Kart Sahibi" />
								</Form.Item>

								<Form.Item
									name="cardNumber"
									label="Kart Numarası"
									rules={[{ validator: checkCreditCard }]}
								>
									<MaskedInput
										mask={[
											{
												mask: '0000 0000 0000 0000',
												lazy: false,
											},
										]}
										prefix={<CreditCardOutlined />}
									/>
								</Form.Item>

								<Form.Item name="expireDate" label="Kart Son Kullanma Tarihi">
									<MaskedInput
										mask={[
											{
												mask: '00/00',
												lazy: false,
												// placeholderChar: 'AA/YY',
												maxLength: 5,
											},
										]}
										prefix={<CalendarOutlined />}
									/>
								</Form.Item>
								<Form.Item name="cvv" label="Kart Son Kullanma Tarihi">
									<Input.Password visibilityToggle={false} maxLength={3} />
								</Form.Item>
							</Form>

							<Title level={2}>Sözleşme</Title>
							<div
								className="payment__agreement"
								dangerouslySetInnerHTML={{ __html: data.agreement }}
							/>
						</div>
					</Col>
					<Col className="payment__column" xs={20} md={6}>
						<div className="payment-cart">
							<Title level={1}>Sepet</Title>

							<List
								bordered
								dataSource={data.cart}
								renderItem={(item) => (
									<List.Item key={item.id}>
										{item.name}
										{item.amount}
										{item.currency}
									</List.Item>
								)}
							/>

							<Button
								type="primary"
								block
								style={{ marginTop: '20px' }}
								onClick={() => form.submit()}
							>
								Satın Al
							</Button>
						</div>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default Payment;
