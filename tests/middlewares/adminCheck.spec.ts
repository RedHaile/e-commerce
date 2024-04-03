import { NextFunction, Request, Response } from "express";

import adminCheck from "../../src/middlewares/adminCheck";
import { WithAuthRequest } from "../../src/misc/type";
import { ForbiddenError } from "../../src/errors/ApiError";

const mockNextFunction = jest.fn();

describe("adminCheck middleware", () => {
  let mockRequest: Partial<WithAuthRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnValue("You do not have permission."),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call next() if user is an admin", () => {
    mockRequest.decodedUser = {  
      _id: "1",
      email: "user1@example.com",
      iat: Date.now(),
      exp: Date.now(),
      role: "admin" 
    };

    adminCheck(
      mockRequest as WithAuthRequest,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test("should block if user is not an admin", () => {
    mockRequest.decodedUser = {  
      _id: "2",
      email: "user2@example.com",
      iat: Date.now(),
      exp: Date.now(),
      role: "customer" 
    };

    adminCheck(
      mockRequest as WithAuthRequest,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toHaveBeenCalledWith(new ForbiddenError("Access denied! You are not the admin!"));
  });
});