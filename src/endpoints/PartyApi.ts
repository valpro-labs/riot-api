import { IRiotClient } from '../types/Base/IRiotClient';
import { Region } from '../types/Shared/ValorantType';
import { PartyJoinByCodeResponse, PartyResponse } from '../types/Party/Party';

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

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/change-queue)
   * 
   * Change the queue for the party
   */
  public async changeQueue(region: Region, partyId: string, queueId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/queue`,
      { method: 'POST', data: { queueID: queueId } }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/set-party-accessibility)
   * 
   * Set the accessibility of the party
   */
  public async setPartyAccessibility(region: Region, partyId: string, accessibility: 'OPEN' | 'CLOSED') {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/accessibility`,
      { method: 'POST', data: { accessibility: accessibility } }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-generate-code)
   * 
   * Generate an invite code for the party
   */
  public async generatePartyCode(region: Region, partyId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/invitecode`,
      { method: 'POST' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-disable-code)
   * 
   * Disable the invite code for the party
   */
  public async disablePartyCode(region: Region, partyId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/invitecode`,
      { method: 'DELETE' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-join-by-code)
   * 
   * Join a party by code
   */
  public async joinPartyByCode(region: Region, code: string) {
    return this.client.requestGLZ<PartyJoinByCodeResponse>(
      region,
      `parties/v1/players/joinbycode/${code}`,
      { method: 'POST' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-set-member-ready)
   * 
   * Set the ready status of a player in the current party
   */
  public async setMemberReady(region: Region, partyId: string, puuid: string, ready: boolean) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/members/${puuid}/setReady`,
      { method: 'POST', data: { ready: ready } }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/enter-matchmaking-queue)
   * 
   * Enter the matchmaking queue for the party
   */
  public async enterMatchmakingQueue(region: Region, partyId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/matchmaking/join`,
      { method: 'POST' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/leave-matchmaking-queue)
   * 
   * Leave the matchmaking queue for the party
   */
  public async leaveMatchmakingQueue(region: Region, partyId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/matchmaking/leave`,
      { method: 'POST' }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/start-custom-game)
   * 
   * Start a custom game
   */
  public async startCustomGame(region: Region, partyId: string) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/startcustomgame`,
      { method: 'POST' }
    );
  }
}
