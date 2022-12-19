import { Request, Response } from 'express';

class CommentsController {
  public async list(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({ });
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.query;

    return res.status(200).send({  });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { text } = req.body;

    return res.status(201).send({  });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { id } = req.query;
    const { text } = req.body;

    return res.status(200).send({  });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    return res.status(204);
  }
}

export default CommentsController;