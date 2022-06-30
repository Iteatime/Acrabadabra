export class Mission {
	client: string;
	title: string;

	constructor(missionClient: string, missionTitle: string) {
		this.client = missionClient;
		this.title = missionTitle;
	}
}
