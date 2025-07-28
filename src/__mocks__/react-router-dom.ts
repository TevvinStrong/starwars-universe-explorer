const mockNavigate = jest.fn();
const actual = jest.requireActual("react-router-dom");

module.exports = {
  ...actual,
  useNavigate: () => mockNavigate,
  __esModule: true,
  mockNavigate,
};

export {};
