import { InferInput } from "valibot";
import { Contents, contents } from "../db/tables";
import { Inject } from "../decorators/injector";
import { ContentsRepository } from "../repository/contents.repository";
import { ContentSchema } from "../schemas/contents.schema";
import { throwErr } from "../utils/error.utils";

export class ContentsService {
  @Inject(ContentsRepository, contents) repo: ContentsRepository;
  async createContent(input: Omit<InferInput<typeof ContentSchema>, "id">) {
    const response = (await this.repo.create(input)) as Contents;
    if (!response.id) {
      return throwErr("unable to create product");
    }
    return response;
  }

  async updateContent(input: InferInput<typeof ContentSchema>) {
    const response = (await this.repo.update(input)) as Contents;
    if (!response.id) {
      return throwErr("unable to update product");
    }
    // emit event to update record in Elastic search
    return response;
  }

  // instead of this we will get product from Elastic search
  async getContents(limit: number, offset: number) {
    const response = (await this.repo.find(limit, offset)) as Contents[];
    return response;
  }

  async getContent(id: string) {
    const [response] = (await this.repo.findOne(id)) as Contents[];
    if (!response.id) {
      return throwErr("content does not exist");
    }
    return response;
  }

  async deleteContent(id: string) {
    const response = await this.repo.delete(id);
    // delete record from Elastic search
    return response;
  }
}
