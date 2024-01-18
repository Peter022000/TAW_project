import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from "react-redux";
import Login from "./components/Login";
import {store} from "./store/store";
import 'intersection-observer';
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {MemoryRouter} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import ChangePassword from "./components/ChangePassword";
import EditDiscount from "./components/EditDiscount";
import EditMenu from "./components/EditMenu";
import EditMenuAddDish from "./components/EditMenuAddDish";
import {act} from "react-dom/test-utils";
import EditQRCode from "./components/EditQRCode";
import OrderList from "./components/OrdersLists";

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock('redux-state-sync', () => ({
  createStateSyncMiddleware:
      () =>
          () =>
              (next: (action: PayloadAction) => void) =>
                  (action: PayloadAction) =>
                      next(action),
  initMessageListener: () => jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

test('renders the login component', () => {
  render(
      <Provider store={store}>
        <Login />
      </Provider>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Hasło/i);
  const loginButton = screen.getByText(/Zaloguj/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

jest.mock('./actions/authAction.js', () => ({
  logOut: jest.fn(),
}));

test('renders AdminPanel component with logged-out state', () => {
  render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminPanel />
        </MemoryRouter>
      </Provider>
  );

  const loginButton = screen.getByText('Zaloguj');
  expect(loginButton).toBeInTheDocument();
});

test('renders AdminPanel component with logged-in state', () => {
  // Mock the useSelector hook to simulate logged-in state
  jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue({
    auth: {
      isLogged: true,
    },
  });

  render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminPanel />
        </MemoryRouter>
      </Provider>
  );

  const logoutButton = screen.getByText('Wyloguj');
  const changePasswordLink = screen.getByText('Zmień hasło');
  const editMenuLink = screen.getByText('Zarządzanie menu');
  const editDiscountLink = screen.getByText('Zarządzanie promocją');
  const editQRodesLink = screen.getByText('Zarządzanie kodami QR');
  const statisticsLink = screen.getByText('Statystyki');

  expect(logoutButton).toBeInTheDocument();
  expect(changePasswordLink).toBeInTheDocument();
  expect(editMenuLink).toBeInTheDocument();
  expect(editDiscountLink).toBeInTheDocument();
  expect(editQRodesLink).toBeInTheDocument();
  expect(statisticsLink).toBeInTheDocument();
});

test('renders ChangePassword component', () => {
  render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
  );

  const oldPasswordInput = screen.getByLabelText(/Stare hasło/i);
  const newPasswordInput = screen.getByLabelText(/Nowe hasło/i);
  const repeatNewPasswordInput = screen.getByLabelText(/Powtórz nowe hasło/i);
  const changePasswordButton = screen.getByText(/Zmień hasło/i);

  expect(oldPasswordInput).toBeInTheDocument();
  expect(newPasswordInput).toBeInTheDocument();
  expect(repeatNewPasswordInput).toBeInTheDocument();
  expect(changePasswordButton).toBeInTheDocument();
});

test('renders EditDiscount component with mocked data and updates discount settings', async () => {
  const mockedResponse = {
    id: "13",
    isEnabled: true,
    ordersRequired: 3,
    discountPercentage: 0.2
  };

  axios.get = jest.fn().mockResolvedValue({ data: mockedResponse });

  render(
      <MemoryRouter>
        <EditDiscount />
      </MemoryRouter>
  );

  await waitFor(() => expect(screen.getByLabelText('Aktywny')).toBeChecked());
  expect(screen.getByLabelText('Nieaktywny')).not.toBeChecked();
  expect(screen.getByLabelText('Wymagana liczba zamówień')).toHaveValue(3);
  expect(screen.getByLabelText('Procent rabatu')).toHaveValue(20);

  fireEvent.click(screen.getByText('Zmień'));

  expect(screen.getByText('Zapisać zmiany?')).toBeInTheDocument();

  axios.post = jest.fn().mockResolvedValue({ data: {} });

  fireEvent.click(screen.getByText('Tak'));

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
});

test('renders EditMenu component with mocked data', async () => {
  const mockedResponse = [
    {
      id:"123",
      dishType:"soup",
      name:"Pomidorowa",
      price:15.99,
      ingredients:["pomidor","cebula","ziemniak","marchewka","natka pietruszki"]},
    {
      id:"345",
      dishType:"mainCourse",
      name:"Ravioli z ricottą i szpinakiem",
      price:27.99,
      ingredients:["ravioli","ricotta","szpinak","parmezan","masło"]},
  ];

  axios.get = jest.fn().mockResolvedValue({ data: mockedResponse });

  render(
      <MemoryRouter>
        <EditMenu />
      </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Pomidorowa')).toBeInTheDocument();
    expect(screen.getByText('Ravioli z ricottą i szpinakiem')).toBeInTheDocument();
  });
});

test('renders EditMenuAddDish and adds a dish', async () => {

  axios.post = jest.fn().mockResolvedValue({ data: {} });

  render(
      <MemoryRouter>
        <EditMenuAddDish />
      </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Nazwa/i), { target: { value: 'Example Dish' } });
  fireEvent.click(screen.getByLabelText(/Danie główne/i));
  fireEvent.change(screen.getByLabelText(/Cena/i), { target: { value: '15' } });
  fireEvent.change(screen.getByLabelText(/Składniki/i), { target: { value: 'Ingredient 1, Ingredient 2' } });

  act(() => {
    fireEvent.click(screen.getByText('Zapisz'));
  });

  await waitFor(() => {
    expect(screen.getByText('Czy chcesz zapisać danie?')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Tak'));
});

it('renders EditQRCode component with mocked data', async () => {
  const mockedQRCodes = [
    { id: "1", qrCode: '1' },
    { id: "2", qrCode: '2' },
  ];
  axios.get = jest.fn().mockResolvedValue({ data: mockedQRCodes });

  render(
      <MemoryRouter>
        <EditQRCode />
      </MemoryRouter>
  );

  await waitFor(() => {
      expect(screen.getByText('Numer stolika: 1')).toBeInTheDocument();
      expect(screen.getByText('Numer stolika: 2')).toBeInTheDocument();
  });
});

test('renders OrderList component with mocked data', async () => {
  const mockedOrders = [
    {
      id: "123",
      userId:"345",
      tableNoId:"567",
      cost:15.99,
      orderDishesDto: [
          {dishDto:{id:"678",dishType:"soup",name:"Pomidorowa",price: 15.99,ingredients:["pomidor","cebula","ziemniak","marchewka","natka pietruszki"]},
            quantity:"1",cost:15.99}],
      paymentMethod:"cash",
      date: "1704373924577",
      status: "NEW",
      isPayed :false,
      orderDiscount: { isUsed: false, discountPercentage: 0.15, oldCost: "15.99"}
    }
  ];

  axios.get = jest.fn().mockResolvedValue({ data: mockedOrders });

  render(
      <Provider store={store}>
        <OrderList orders={mockedOrders} />
      </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/\s*Pomidorowa\s*x\s*1\s*/)).toBeInTheDocument();
    expect(screen.getByText(/Koszt/)).toBeInTheDocument();
    expect(screen.getByText(/15\.99\s*zł/)).toBeInTheDocument();expect(screen.getByText(/Metoda płatności:/)).toBeInTheDocument();
    expect(screen.getByText(/Gotówka/)).toBeInTheDocument();
    expect(screen.getByText(/Data:/)).toBeInTheDocument();
    expect(screen.getByText(/\s*01\.04\.2024,\s*14:12\s*/)).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(/Nowe/)).toBeInTheDocument();
    expect(screen.getByText(/Opłacono:/)).toBeInTheDocument();
    expect(screen.getByText(/Nie/)).toBeInTheDocument();
  });
});
