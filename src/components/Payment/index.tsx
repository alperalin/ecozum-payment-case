// Imports
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IMask from 'imask';
import MaskedInput from 'antd-mask-input';

// Store
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { paymentGetAgreement } from '../../features/payment/paymentSlice';

// Api
import api from '../../api';

// antd
import {
	Layout,
	Row,
	Col,
	Typography,
	Button,
	List,
	Form,
	Input,
	Spin,
	Alert,
} from 'antd';
import {
	UserOutlined,
	CreditCardOutlined,
	CalendarOutlined,
} from '@ant-design/icons';

// Styles
import './style.scss';

// Component
import Header from '../Header';
import Amount from '../Amount';
import CartItem from './CartItem';

// antd variables
const { Content } = Layout;
const { Title } = Typography;

function Payment() {
	// Router
	const navigate = useNavigate();

	// antd state
	const [form] = Form.useForm();

	// Redux
	const { agreement, packageIds, totalAmount, apiStatus, apiMessage } =
		useAppSelector((state) => state.payment);
	// Secilen paketler redux'tan aliniyor
	const selectedPackages = useAppSelector((state) =>
		state.packages.data.filter((item) => item.selected === true)
	);
	const dispatch = useAppDispatch();

	// Functions
	// first init
	useEffect(() => {
		dispatch(paymentGetAgreement());
		// eslint-disable-next-line
	}, []);

	// Functions
	// Validations
	function checkCreditCard(_: any, value: any) {
		// Input bos ise
		if (!value)
			return Promise.reject(new Error('Lütfen kart numarasını giriniz'));

		// Bosluklar silinip kart numarasi uzunluguna bakiliyor
		const trimmedValue = value.replace(/\D+/g, '');

		if (trimmedValue && trimmedValue.length === 16) return Promise.resolve();

		// Varsayilan hata mesaji
		return Promise.reject(new Error('Lütfen kart numarasını giriniz'));
	}

	function checkDate(_: any, value: any) {
		// Input bos ise
		if (!value)
			return Promise.reject(
				new Error('Lütfen kart son kullanma tarihini giriniz')
			);

		// Bosluklar silinip kart numarasi uzunluguna bakiliyor
		const trimmedValue = value.replace(/\D+/g, '');

		if (trimmedValue && trimmedValue.length === 4) return Promise.resolve();

		// Varsayilan hata mesaji
		return Promise.reject(
			new Error('Lütfen kart son kullanma tarihini giriniz')
		);
	}

	// Handle Payment
	function handlePayment({ cardHolderName, cardNumber, expireDate, cvv }: any) {
		cardNumber = cardNumber.replace(/\D+/g, '');
		api.post('/api/payment', {
			packageIds,
			cardHolderName,
			cardNumber,
			expireDate,
			cvv,
			totalAmount,
		});

		navigate('/thankyou');
	}

	return (
		<Layout className="payment-layout">
			<Header />
			<Content className="payment-content">
				<Row className="payment-row" justify="center" align="top" gutter={30}>
					{apiStatus === 'loading' && <Spin size="large" tip="Loading" />}

					{apiMessage && <Alert message={apiMessage} type="error" showIcon />}

					{apiStatus === 'succeeded' && (
						<>
							<Col className="payment-column" xs={20} md={14}>
								<div className="payment-card">
									<div className="payment-card__form-container">
										<Title className="payment-card__title" level={2}>
											Kart Bilgileri
										</Title>
										<Form
											form={form}
											className="payment-card-form"
											name="payment-card-form"
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
												<Input
													prefix={<UserOutlined />}
													placeholder="Kart Sahibi"
												/>
											</Form.Item>

											<Form.Item
												name="cardNumber"
												label="Kart Numarası"
												rules={[{ required: true, validator: checkCreditCard }]}
											>
												<MaskedInput
													className="payment-card-form__masked-input"
													mask={[
														{
															mask: '0000 0000 0000 0000',
															lazy: false,
														},
													]}
													prefix={<CreditCardOutlined />}
												/>
											</Form.Item>

											<Input.Group>
												<Row gutter={10}>
													<Col span={12}>
														<Form.Item
															name="expireDate"
															label="Kart Son Kullanma Tarihi"
															rules={[{ required: true, validator: checkDate }]}
														>
															<MaskedInput
																className="payment-card-form__masked-input"
																mask={[
																	{
																		mask: 'MM/YY',
																		blocks: {
																			MM: {
																				mask: IMask.MaskedRange,
																				from: 1,
																				to: 12,
																			},
																			YY: {
																				mask: IMask.MaskedRange,
																				from: 22,
																				to: 29,
																			},
																		},
																		autofix: false,
																		lazy: false,
																		overwrite: true,
																	},
																]}
																prefix={<CalendarOutlined />}
															/>
														</Form.Item>
													</Col>
													<Col span={12}>
														<Form.Item
															name="cvv"
															label="Kart CVV Numarası"
															rules={[
																{
																	required: true,
																	message:
																		'Lütfen kart cvv numarasını giriniz!',
																},
															]}
														>
															<Input.Password
																visibilityToggle={false}
																placeholder="Kart CVV Numarası"
																maxLength={3}
															/>
														</Form.Item>
													</Col>
												</Row>
											</Input.Group>
										</Form>
									</div>

									<div className="payment-agreement">
										<Title className="payment-agreement__title" level={2}>
											Sözleşme
										</Title>

										{agreement && (
											<div
												className="payment-agreement__content"
												dangerouslySetInnerHTML={{ __html: agreement }}
											/>
										)}
									</div>
								</div>
							</Col>
							<Col className="payment-column" xs={20} md={6}>
								<div className="payment-cart">
									<Title level={1}>Sepet</Title>

									<List
										className="payment-cart__list"
										dataSource={selectedPackages}
										renderItem={(item) => (
											<List.Item
												className="payment-cart__list-item"
												key={item.id}
												style={{ padding: 0 }}
											>
												<CartItem packageItem={item} />
											</List.Item>
										)}
									/>

									<Amount />

									<Button
										className="payment__buy-button"
										type="primary"
										size="large"
										block
										style={{ marginTop: '20px' }}
										onClick={() => form.submit()}
										disabled={totalAmount ? false : true}
									>
										Satın Al
									</Button>
								</div>
							</Col>
						</>
					)}
				</Row>
			</Content>
		</Layout>
	);
}

export default Payment;
