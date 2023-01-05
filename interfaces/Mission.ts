export interface CreateMissionInput {
    missionName: string;
    startTime: number;
    stopTime: number;
}

export interface EditMissionInput {
    startTime: number;
    stopTime: number;
}