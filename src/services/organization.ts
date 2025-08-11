import { API } from "./http";

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationDto {
  name: string;
}

export const OrganizationAPI = {
  create: (data: CreateOrganizationDto) =>
    API.post<Organization, CreateOrganizationDto>("/organization", data),
};
