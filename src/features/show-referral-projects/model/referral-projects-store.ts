import { makeAutoObservable } from "mobx";
import {
  IReferralProject,
  referralApi,
} from "../../../entities/referral-project";

export class ReferralProjectsStore {
  private _projects: IReferralProject[] = [];

  private _isFetching = false;

  constructor(refcode?: string) {
    makeAutoObservable(this);

    if (refcode) {
      this.fetchProjects(refcode);
    }
  }

  fetchProjects = async (refcode: string) => {
    try {
      this._isFetching = true;
      const data = await referralApi.fetchReferralProjects(refcode);
      this._projects = data;
    } catch (e) {
      console.log(e);
    } finally {
      this._isFetching = false;
    }
  };

  get allProjects(): IReferralProject[] {
    return this._projects;
  }

  get projectsWithAmount() {
    return this._projects.filter((project) => Number(project.amount) > 0);
  }

  get isFetchingProjects(): boolean {
    return this._isFetching;
  }
}
