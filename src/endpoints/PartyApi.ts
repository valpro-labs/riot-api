import { IRiotClient } from '../types/Base/IRiotClient';
import { Region } from '../types/Shared/ValorantType';
import { PartyResponse } from '../types/Party/Party';

export class PartyApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party)
   * 
   * Get the party information for the given party ID.
   */
  public async getParty(region: Region, partyId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}`,
      { method: 'GET' }
    );
  }
}
