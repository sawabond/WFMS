﻿using BusinessLogic.Filtering.AppUser;
using BusinessLogic.Models.AppUser;
using FluentResults;

namespace BusinessLogic.Abstractions;

public interface IUserService
{
    Task<Result<IEnumerable<UserViewModel>>> GetUsersAsync(AppUserFilter filter);

    Task<Result<UserViewModel>> GetUserByIdAsync(string id);

    Task<Result> DeleteUserAsync(string id);

    Task<Result> PatchUserAsync(string id, UserPatchModel model);

    Task<Result<string>> CreateUserAsync(UserCreateModel model, string role);
}
