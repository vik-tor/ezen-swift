export type SenderIdCategory = 'PROMOTIONAL' | 'TRANSACTIONAL';
export type SenderIdStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface SenderId {
	id: number;
	name: string;
	description: string;
	category: SenderIdCategory;
	status: SenderIdStatus;
	rejectionReason: string;
	createdAt: string;
	updatedAt: string;
	documentFileName: string;
	documentDownloadUrl: string;
	ownerId: number;
	ownerUsername: string;
	ownerEmail: string;
	ownerClientCode: string;
	default: boolean;
}

export interface SenderIdRequest {
	name: string;
	description: string;
	category: SenderIdCategory;
	sampleMessage: string;
}
