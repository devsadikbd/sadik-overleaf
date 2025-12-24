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
 * 2. LOGOUT - End user session
 */
export const LOGOUT_MUTATION = `
  mutation Logout {
    endSession
  }
`;

/**
 * 3. SIGNUP - Create a new user account
 */
export const SIGNUP_MUTATION = `
  mutation Signup($name: String!, $email: String!, $password: String!, $baseUrl: String) {
    signup(name: $name, email: $email, password: $password, baseUrl: $baseUrl)
  }
`;

/**
 * 4. FORGOT PASSWORD - Request password reset link
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
 * 7. DELETE PROJECT - Delete a project by ID
 */
export const DELETE_PROJECT_MUTATION = `
  mutation DeleteProject($id: ID!) {
    deleteProject(where: { id: $id }) {
      id
    }
  }
`;

export interface DeleteProjectVariables {
  id: string;
}

export interface DeleteProjectResponse {
  deleteProject: {
    id: string;
  };
}

/**
 * 7b. ARCHIVE PROJECT - Archive a project by ID
 */
export const ARCHIVE_PROJECT_MUTATION = `
  mutation ArchiveProject($id: ID!) {
    updateProject(where: { id: $id }, data: { archived: true }) {
      id
      archived
    }
  }
`;

export interface ArchiveProjectVariables {
  id: string;
}

export interface ArchiveProjectResponse {
  updateProject: {
    id: string;
    archived: boolean;
  };
}

/**
 * 7c. COPY PROJECT - Copy/duplicate a project by creating new one with same content
 */
export const COPY_PROJECT_MUTATION = `
  mutation CopyProject($id: ID!) {
    copyProject(id: $id) {
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

export interface CopyProjectVariables {
  id: string;
}

export interface CopyProjectResponse {
  copyProject: Project;
}

/**
 * 8. GET PROJECTS - Fetch projects for the current authenticated user only
 */
export const GET_PROJECTS_QUERY = `
  query GetProjects {
    projects(where: { owner: { id: { equals: $userId } } }) {
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
 * 8b. GET MY PROJECTS - Fetch only current user's projects (alternative)
 */
export const GET_MY_PROJECTS_QUERY = `
  query GetMyProjects {
    authenticatedItem {
      ... on User {
        id
        name
        email
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
    }
  }
`;

/**
 * 9. GET CURRENT USER - Get authenticated user info
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

/**
 * 10. GET PROJECT BY ID - Fetch a single project with content
 */
export const GET_PROJECT_QUERY = `
  query GetProject($id: ID!) {
    project(where: { id: $id }) {
      id
      title
      content
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

export interface GetProjectVariables {
  id: string;
}

export interface ProjectWithContent {
  id: string;
  title: string;
  content: any; // JSON type from backend
  owner: {
    id: string;
    name: string;
    email: string;
  };
  updatedAt: string;
  createdAt: string;
}

export interface GetProjectResponse {
  project: ProjectWithContent;
}

/**
 * 11. UPDATE PROJECT CONTENT - Update project content
 */
export const UPDATE_PROJECT_MUTATION = `
  mutation UpdateProject($id: ID!, $content: JSON!) {
    updateProject(where: { id: $id }, data: { content: $content }) {
      id
      content
      updatedAt
    }
  }
`;

export interface UpdateProjectVariables {
  id: string;
  content: any; // JSON type
}

export interface UpdateProjectResponse {
  updateProject: {
    id: string;
    content: any; // JSON type
    updatedAt: string;
  };
}
