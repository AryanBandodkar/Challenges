interface UserService {
  getUser(): string;
}

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUser(): string {
    return this.userService.getUser();
  }
}

function demonstrateMocking(): string {
  const mockUserService: UserService = {
    getUser: () => 'Mock User'
  };

  const controller = new UserController(mockUserService);

  return controller.getUser();
}

/*
describe('UserController', () => {
  it('uses a mocked service', () => {
    const mockService = {
      getUser: jest.fn().mockReturnValue('Mock User')
    };

    const controller = new UserController(mockService);

    expect(controller.getUser()).toBe('Mock User');
  });
});

describe('User API', () => {
  it('GET /users returns success', async () => {
    await request(app.getHttpServer()).get('/users').expect(200);
  });
});
*/

export function solve_14_unit_e2e_mocking_strategy(): string {
  const result = demonstrateMocking();

  return `Unit and E2E testing strategy configured: ${result}`;
}