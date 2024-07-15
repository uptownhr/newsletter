import KvKey = Deno.KvKey;
import { NewsletterModel } from './app.controller.ts';

const kv = await Deno.openKv();

interface ParsedId {
  kvKey: string;
  email: string;
}

export class NewsletterRepo {
  kvKey = 'newsletter';

  constructor() {}

  async create(email: string): Promise<NewsletterModel> {
    // check if email exists
    const existing = await this.findOne(email);

    if (existing) {
      throw new Error('Email already exists');
    }

    const id = this.createId(email);

    const created = await kv.set(id, {
      email,
      created: new Date(),
      verified: false,
    } satisfies NewsletterModel);

    console.log('created', created);

    const res = await kv.get<NewsletterModel>(id);

    console.log('get', res);

    if (res.value === null) {
      throw new Error('Failed to create newsletter');
    }

    return res.value;
  }

  async update(
    email: string,
    updatePayload: Pick<NewsletterModel, 'verified'>,
  ): Promise<NewsletterModel> {
    // check if email exists
    const existing = await this.findOne(email);

    if (!existing) {
      throw new Error('Record for email Does not exist');
    }

    const id = this.createId(email);

    const updated = await kv.set(id, {
      ...updatePayload,
      email,
      created: existing.created,
    } satisfies NewsletterModel);

    console.log('updated', updated);

    const res = await kv.get<NewsletterModel>(id);

    console.log('get', res);

    if (res.value === null) {
      throw new Error('Failed to create newsletter');
    }

    return res.value;
  }

  async findOne(email: string): Promise<NewsletterModel | null> {
    const id = this.createId(email);
    console.log('searching', id);

    const entry = await kv.get<NewsletterModel>(id);

    console.log('found', entry);

    return entry.value;
  }

  private createId(email: string): [string, string] {
    return [this.kvKey, email.toLowerCase()];
  }

  private parseId(id: KvKey): ParsedId {
    console.log('parsing id', id);
    return {
      kvKey: id[0] as string,
      email: id[1] as string,
    };
  }
}
