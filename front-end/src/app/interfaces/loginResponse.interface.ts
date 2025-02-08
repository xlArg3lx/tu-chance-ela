export interface LoginResponse {
  data: {
    authorization: {
      token: string;
      type: string;
      expires_in: number;
    };
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: null;
    };
  };
  result: {
    code: number;
    status: string;
    result_message: {
      value: string;
    };
  };
}
