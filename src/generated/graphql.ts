import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type CreateMilestoneScheduleDto = {
  durationInHours: Scalars['Int'];
  milestoneId?: InputMaybe<Scalars['Int']>;
  weekDay: WeekDay;
};

export type CreateResourceDto = {
  isFree: Scalars['Boolean'];
  name: Scalars['String'];
  typeId: Scalars['Int'];
  url: Scalars['String'];
};

export type GqlCountry = {
  __typename?: 'GqlCountry';
  key: Scalars['String'];
  name: Scalars['String'];
};

export type GqlField = {
  __typename?: 'GqlField';
  id: Scalars['Int'];
  name: Scalars['String'];
  specializations: Array<GqlSpecialization>;
};

export type GqlGoal = {
  __typename?: 'GqlGoal';
  actualEndDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  estimatedEndDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  milestones: Array<GqlMilestone>;
  name: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  topic: GqlTopic;
  topicId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type GqlGoalsResponse = {
  __typename?: 'GqlGoalsResponse';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  list: Array<GqlGoal>;
  page: Scalars['Int'];
};

export type GqlMilestone = {
  __typename?: 'GqlMilestone';
  actualEndDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  durationInHours: Scalars['Int'];
  estimatedEndDate: Scalars['DateTime'];
  goalId: Scalars['Int'];
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  milestoneSchedules: Array<GqlMilestoneSchedule>;
  name: Scalars['String'];
  resource: GqlResource;
  resourceId: Scalars['Int'];
  startDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GqlMilestoneSchedule = {
  __typename?: 'GqlMilestoneSchedule';
  durationInHours: Scalars['Int'];
  id: Scalars['Int'];
  weekDay: WeekDay;
};

export type GqlProfile = {
  __typename?: 'GqlProfile';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  country: GqlCountry;
  countryCode: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  timezoneName: Scalars['String'];
  userId: Scalars['String'];
};

export type GqlResource = {
  __typename?: 'GqlResource';
  id: Scalars['Int'];
  isFree: Scalars['Boolean'];
  name: Scalars['String'];
  type: GqlResourceType;
  typeId: Scalars['Int'];
  url: Scalars['String'];
};

export type GqlResourceType = {
  __typename?: 'GqlResourceType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GqlSpecialization = {
  __typename?: 'GqlSpecialization';
  fieldId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GqlTimezone = {
  __typename?: 'GqlTimezone';
  id: Scalars['Int'];
  name: Scalars['String'];
  offset: Scalars['Float'];
};

export type GqlTopic = {
  __typename?: 'GqlTopic';
  id: Scalars['Int'];
  name: Scalars['String'];
  specialization: GqlSpecialization;
  specializationId: Scalars['Int'];
};

export type GqlUser = {
  __typename?: 'GqlUser';
  email: Scalars['String'];
  id: Scalars['String'];
  profile?: Maybe<GqlProfile>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGoal: GqlGoal;
  createMilestone: GqlMilestone;
  createProfile: GqlProfile;
  deleteGoal: GqlGoal;
  deleteMilestone: GqlMilestone;
  editProfile: GqlProfile;
  login: Scalars['String'];
  sendverificationEmail: Scalars['String'];
  signup: Scalars['String'];
  updateGoal: GqlGoal;
  updateMilestone: GqlMilestone;
  verifyEmail: Scalars['String'];
};


export type MutationCreateGoalArgs = {
  name: Scalars['String'];
  specializationId: Scalars['Int'];
  topicName: Scalars['String'];
};


export type MutationCreateMilestoneArgs = {
  estimatedEndDate: Scalars['String'];
  goalId: Scalars['Int'];
  name: Scalars['String'];
  resource: CreateResourceDto;
  schedules: Array<CreateMilestoneScheduleDto>;
  startDate: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  countryCode: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  timezoneName?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteGoalArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMilestoneArgs = {
  id: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  timezoneName?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSendverificationEmailArgs = {
  email: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateGoalArgs = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateMilestoneArgs = {
  estimatedEndDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  resource?: InputMaybe<CreateResourceDto>;
  schedules?: InputMaybe<Array<CreateMilestoneScheduleDto>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  countries: Array<GqlCountry>;
  fields: Array<GqlField>;
  goal?: Maybe<GqlGoal>;
  goals: GqlGoalsResponse;
  me: GqlUser;
  milestone?: Maybe<GqlMilestone>;
  profile?: Maybe<GqlProfile>;
  resourceTypes: Array<GqlResourceType>;
  timezones: Array<GqlTimezone>;
  topics: Array<GqlTopic>;
};


export type QueryGoalArgs = {
  id: Scalars['Int'];
};


export type QueryGoalsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  topicId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryMilestoneArgs = {
  id: Scalars['Int'];
};


export type QueryProfileArgs = {
  userId: Scalars['String'];
};


export type QueryTopicsArgs = {
  search?: InputMaybe<Scalars['String']>;
  specializationId?: InputMaybe<Scalars['Int']>;
};

export enum WeekDay {
  Fri = 'Fri',
  Mon = 'Mon',
  Sat = 'Sat',
  Sun = 'Sun',
  Thu = 'Thu',
  Tue = 'Tue',
  Wed = 'Wed'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'GqlCountry', key: string, name: string }> };

export type TimezonesQueryVariables = Exact<{ [key: string]: never; }>;


export type TimezonesQuery = { __typename?: 'Query', timezones: Array<{ __typename?: 'GqlTimezone', name: string, offset: number }> };

export type CreateGoalMutationVariables = Exact<{
  name: Scalars['String'];
  topicName: Scalars['String'];
  specializationId: Scalars['Int'];
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'GqlGoal', id: number, name: string, startDate?: string | null, estimatedEndDate?: string | null, actualEndDate?: string | null, isActive: boolean, createdAt: string, updatedAt: string, userId: string, topicId: number, topic: { __typename?: 'GqlTopic', id: number, name: string, specializationId: number, specialization: { __typename?: 'GqlSpecialization', id: number, name: string, fieldId: number } }, milestones: Array<{ __typename?: 'GqlMilestone', id: number, name: string, startDate: string, durationInHours: number, estimatedEndDate: string, actualEndDate?: string | null, isActive: boolean, createdAt: string, updatedAt: string, goalId: number, resourceId: number, resource: { __typename?: 'GqlResource', id: number, name: string, url: string, isFree: boolean, typeId: number, type: { __typename?: 'GqlResourceType', id: number, name: string } }, milestoneSchedules: Array<{ __typename?: 'GqlMilestoneSchedule', id: number, weekDay: WeekDay, durationInHours: number }> }> } };

export type CreateMilestoneMutationVariables = Exact<{
  name: Scalars['String'];
  startDate: Scalars['String'];
  estimatedEndDate: Scalars['String'];
  goalId: Scalars['Int'];
  resource: CreateResourceDto;
  schedules: Array<CreateMilestoneScheduleDto>;
}>;


export type CreateMilestoneMutation = { __typename?: 'Mutation', createMilestone: { __typename?: 'GqlMilestone', id: number, name: string, startDate: string, estimatedEndDate: string, durationInHours: number, actualEndDate?: string | null, isActive: boolean, goalId: number } };

export type DeleteGoalMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGoalMutation = { __typename?: 'Mutation', deleteGoal: { __typename?: 'GqlGoal', id: number, name: string, userId: string } };

export type GoalQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GoalQuery = { __typename?: 'Query', goal?: { __typename?: 'GqlGoal', id: number, name: string, startDate?: string | null, estimatedEndDate?: string | null, actualEndDate?: string | null, isActive: boolean, createdAt: string, updatedAt: string, userId: string, topicId: number, topic: { __typename?: 'GqlTopic', id: number, name: string, specializationId: number, specialization: { __typename?: 'GqlSpecialization', id: number, name: string, fieldId: number } }, milestones: Array<{ __typename?: 'GqlMilestone', id: number, name: string, startDate: string, durationInHours: number, estimatedEndDate: string, actualEndDate?: string | null, isActive: boolean, createdAt: string, updatedAt: string, goalId: number, resourceId: number, resource: { __typename?: 'GqlResource', id: number, name: string, url: string, isFree: boolean, typeId: number, type: { __typename?: 'GqlResourceType', id: number, name: string } }, milestoneSchedules: Array<{ __typename?: 'GqlMilestoneSchedule', id: number, weekDay: WeekDay, durationInHours: number }> }> } | null };

export type GoalsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  topicId?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GoalsQuery = { __typename?: 'Query', goals: { __typename?: 'GqlGoalsResponse', count: number, page: number, limit: number, list: Array<{ __typename?: 'GqlGoal', id: number, name: string, startDate?: string | null, estimatedEndDate?: string | null, actualEndDate?: string | null, isActive: boolean, createdAt: string, updatedAt: string, userId: string, topicId: number, topic: { __typename?: 'GqlTopic', id: number, name: string, specializationId: number, specialization: { __typename?: 'GqlSpecialization', id: number, name: string, fieldId: number } }, milestones: Array<{ __typename?: 'GqlMilestone', id: number, name: string, startDate: string, durationInHours: number, estimatedEndDate: string, actualEndDate?: string | null, isActive: boolean, createdAt: string, updatedAt: string, goalId: number, resourceId: number, resource: { __typename?: 'GqlResource', id: number, name: string, url: string, isFree: boolean, typeId: number, type: { __typename?: 'GqlResourceType', id: number, name: string } }, milestoneSchedules: Array<{ __typename?: 'GqlMilestoneSchedule', id: number, weekDay: WeekDay, durationInHours: number }> }> }> } };

export type FieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type FieldsQuery = { __typename?: 'Query', fields: Array<{ __typename?: 'GqlField', id: number, name: string, specializations: Array<{ __typename?: 'GqlSpecialization', id: number, name: string }> }> };

export type ResourceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourceTypesQuery = { __typename?: 'Query', resourceTypes: Array<{ __typename?: 'GqlResourceType', id: number, name: string }> };

export type TopicsQueryVariables = Exact<{
  specializationId?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'GqlTopic', id: number, name: string }> };

export type CreateProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  countryCode: Scalars['String'];
  timezoneName: Scalars['String'];
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'GqlProfile', id: string } };

export type EditProfileMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  timezoneName?: InputMaybe<Scalars['String']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'GqlProfile', id: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'GqlUser', id: string, email: string, profile?: { __typename?: 'GqlProfile', id: string, firstName: string, lastName: string, bio?: string | null, avatar?: string | null, userId: string, countryCode: string, timezoneName: string } | null } };

export type ProfileQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'GqlProfile', id: string, firstName: string, lastName: string, bio?: string | null, avatar?: string | null, userId: string, countryCode: string, timezoneName: string, country: { __typename?: 'GqlCountry', name: string, key: string } } | null };


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!) {
  signup(email: $email, password: $password)
}
    `;
export const CountriesDocument = gql`
    query countries {
  countries {
    key
    name
  }
}
    `;
export const TimezonesDocument = gql`
    query timezones {
  timezones {
    name
    offset
  }
}
    `;
export const CreateGoalDocument = gql`
    mutation createGoal($name: String!, $topicName: String!, $specializationId: Int!) {
  createGoal(
    name: $name
    topicName: $topicName
    specializationId: $specializationId
  ) {
    id
    name
    startDate
    estimatedEndDate
    actualEndDate
    isActive
    createdAt
    updatedAt
    userId
    topicId
    topic {
      id
      name
      specializationId
      specialization {
        id
        name
        fieldId
      }
    }
    milestones {
      id
      name
      startDate
      durationInHours
      estimatedEndDate
      actualEndDate
      isActive
      createdAt
      updatedAt
      goalId
      resourceId
      resource {
        id
        name
        url
        isFree
        typeId
        type {
          id
          name
        }
      }
      milestoneSchedules {
        id
        weekDay
        durationInHours
      }
    }
  }
}
    `;
export const CreateMilestoneDocument = gql`
    mutation createMilestone($name: String!, $startDate: String!, $estimatedEndDate: String!, $goalId: Int!, $resource: CreateResourceDto!, $schedules: [CreateMilestoneScheduleDto!]!) {
  createMilestone(
    name: $name
    startDate: $startDate
    estimatedEndDate: $estimatedEndDate
    goalId: $goalId
    resource: $resource
    schedules: $schedules
  ) {
    id
    name
    startDate
    estimatedEndDate
    durationInHours
    actualEndDate
    isActive
    goalId
  }
}
    `;
export const DeleteGoalDocument = gql`
    mutation deleteGoal($id: Int!) {
  deleteGoal(id: $id) {
    id
    name
    userId
  }
}
    `;
export const GoalDocument = gql`
    query goal($id: Int!) {
  goal(id: $id) {
    id
    name
    startDate
    estimatedEndDate
    actualEndDate
    isActive
    createdAt
    updatedAt
    userId
    topicId
    topic {
      id
      name
      specializationId
      specialization {
        id
        name
        fieldId
      }
    }
    milestones {
      id
      name
      startDate
      durationInHours
      estimatedEndDate
      actualEndDate
      isActive
      createdAt
      updatedAt
      goalId
      resourceId
      resource {
        id
        name
        url
        isFree
        typeId
        type {
          id
          name
        }
      }
      milestoneSchedules {
        id
        weekDay
        durationInHours
      }
    }
  }
}
    `;
export const GoalsDocument = gql`
    query goals($userId: String, $topicId: Int, $page: Int, $limit: Int) {
  goals(userId: $userId, topicId: $topicId, page: $page, limit: $limit) {
    count
    page
    limit
    list {
      id
      name
      startDate
      estimatedEndDate
      actualEndDate
      isActive
      createdAt
      updatedAt
      userId
      topicId
      topic {
        id
        name
        specializationId
        specialization {
          id
          name
          fieldId
        }
      }
      milestones {
        id
        name
        startDate
        durationInHours
        estimatedEndDate
        actualEndDate
        isActive
        createdAt
        updatedAt
        goalId
        resourceId
        resource {
          id
          name
          url
          isFree
          typeId
          type {
            id
            name
          }
        }
        milestoneSchedules {
          id
          weekDay
          durationInHours
        }
      }
    }
  }
}
    `;
export const FieldsDocument = gql`
    query fields {
  fields {
    id
    name
    specializations {
      id
      name
    }
  }
}
    `;
export const ResourceTypesDocument = gql`
    query resourceTypes {
  resourceTypes {
    id
    name
  }
}
    `;
export const TopicsDocument = gql`
    query topics($specializationId: Int, $search: String) {
  topics(specializationId: $specializationId, search: $search) {
    id
    name
  }
}
    `;
export const CreateProfileDocument = gql`
    mutation createProfile($firstName: String!, $lastName: String!, $bio: String, $avatar: String, $countryCode: String!, $timezoneName: String!) {
  createProfile(
    firstName: $firstName
    lastName: $lastName
    bio: $bio
    avatar: $avatar
    countryCode: $countryCode
    timezoneName: $timezoneName
  ) {
    id
  }
}
    `;
export const EditProfileDocument = gql`
    mutation editProfile($firstName: String, $lastName: String, $bio: String, $avatar: String, $countryCode: String, $timezoneName: String) {
  editProfile(
    firstName: $firstName
    lastName: $lastName
    bio: $bio
    avatar: $avatar
    countryCode: $countryCode
    timezoneName: $timezoneName
  ) {
    id
  }
}
    `;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    profile {
      id
      firstName
      lastName
      bio
      avatar
      userId
      countryCode
      timezoneName
    }
  }
}
    `;
export const ProfileDocument = gql`
    query profile($userId: String!) {
  profile(userId: $userId) {
    id
    firstName
    lastName
    bio
    avatar
    userId
    countryCode
    country {
      name
      key
    }
    timezoneName
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    signup(variables: SignupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignupMutation>(SignupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signup', 'mutation');
    },
    countries(variables?: CountriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CountriesQuery>(CountriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'countries', 'query');
    },
    timezones(variables?: TimezonesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TimezonesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TimezonesQuery>(TimezonesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'timezones', 'query');
    },
    createGoal(variables: CreateGoalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateGoalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateGoalMutation>(CreateGoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createGoal', 'mutation');
    },
    createMilestone(variables: CreateMilestoneMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateMilestoneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMilestoneMutation>(CreateMilestoneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMilestone', 'mutation');
    },
    deleteGoal(variables: DeleteGoalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteGoalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteGoalMutation>(DeleteGoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteGoal', 'mutation');
    },
    goal(variables: GoalQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GoalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GoalQuery>(GoalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'goal', 'query');
    },
    goals(variables?: GoalsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GoalsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GoalsQuery>(GoalsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'goals', 'query');
    },
    fields(variables?: FieldsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FieldsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FieldsQuery>(FieldsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'fields', 'query');
    },
    resourceTypes(variables?: ResourceTypesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResourceTypesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResourceTypesQuery>(ResourceTypesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resourceTypes', 'query');
    },
    topics(variables?: TopicsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TopicsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TopicsQuery>(TopicsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'topics', 'query');
    },
    createProfile(variables: CreateProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProfileMutation>(CreateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProfile', 'mutation');
    },
    editProfile(variables?: EditProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditProfileMutation>(EditProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editProfile', 'mutation');
    },
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me', 'query');
    },
    profile(variables: ProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileQuery>(ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'profile', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;