// GraphQL queries and mutations for Keystone authentication

/**
 * 1. LOGIN - Authenticate user with email and password
 */
export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      __typename
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

/**
 * 2. SIGNUP - Create a new user account
 */
export const SIGNUP_MUTATION = `
  mutation Signup($name: String!, $email: String!, $password: String!, $baseUrl: String) {
    signup(name: $name, email: $email, password: $password, baseUrl: $baseUrl)
  }
`;

/**
 * 3. FORGOT PASSWORD - Request password reset link
 */
export const FORGOT_PASSWORD_MUTATION = `
  mutation ForgotPassword($email: String!, $baseUrl: String) {
    forgotPassword(email: $email, baseUrl: $baseUrl)
  }
`;

/**
 * 4. RESET PASSWORD - Reset password with token
 */
export const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

/**
 * 5. VERIFY EMAIL - Verify email address with token
 */
export const VERIFY_EMAIL_MUTATION = `
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

// Variable types for TypeScript
export interface LoginVariables {
  email: string;
  password: string;
}

export interface SignupVariables {
  name: string;
  email: string;
  password: string;
  baseUrl?: string;
}

export interface ForgotPasswordVariables {
  email: string;
  baseUrl?: string;
}

export interface ResetPasswordVariables {
  token: string;
  password: string;
}

export interface VerifyEmailVariables {
  token: string;
}

/**
 * 6. CREATE PROJECT - Create a new project
 */
export const CREATE_PROJECT_MUTATION = `
  mutation CreateProject($title: String!) {
    createProject(data: { title: $title }) {
      id
      title
      owner {
        id
        name
        email
      }
      updatedAt
      createdAt
    }
  }
`;

export interface CreateProjectVariables {
  title: string;
}

export interface CreateProjectResponse {
  createProject: Project;
}

/**
 * 7. GET PROJECTS - Fetch all projects for the current user
 */
export const GET_PROJECTS_QUERY = `
  query GetProjects {
    projects {
      id
      title
      owner {
        id
        name
        email
      }
      updatedAt
      createdAt
    }
  }
`;

/**
 * 8. GET CURRENT USER - Get authenticated user info
 */
export const GET_CURRENT_USER_QUERY = `
  query GetCurrentUser {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;

export interface Project {
  id: string;
  title: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  updatedAt: string;
  createdAt: string;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface CurrentUserResponse {
  authenticatedItem: {
    id: string;
    name: string;
    email: string;
  } | null;
}
