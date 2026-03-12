export const ApplicationStatus = {
	PENDING: 'PENDING',
	APPROVED_BY_DEPARTMENT: 'APPROVED_BY_DEPARTMENT',
	APPROVED_BY_ASSOCIATE_DEAN: 'APPROVED_BY_ASSOCIATE_DEAN',
	APPROVED_BY_DEAN: 'APPROVED_BY_DEAN',
	APPROVED_BY_COMMITTEE: 'APPROVED_BY_COMMITTEE',
	REJECTED: 'REJECTED'
} as const;

export type ApplicationStatusValue =
	(typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export function getApplicationStatusLabel(status: ApplicationStatusValue): string {
	switch (status) {
		case ApplicationStatus.PENDING:
			return 'รอดำเนินการ';
		case ApplicationStatus.REJECTED:
			return 'ไม่ผ่านการพิจารณา';
		case ApplicationStatus.APPROVED_BY_DEPARTMENT:
			return 'ผ่านการพิจารณาโดยหัวหน้าภาควิชา';
		case ApplicationStatus.APPROVED_BY_ASSOCIATE_DEAN:
			return 'ผ่านการพิจารณาโดยรองคณบดี';
		case ApplicationStatus.APPROVED_BY_DEAN:
			return 'ผ่านการพิจารณาโดยคณบดี';
		case ApplicationStatus.APPROVED_BY_COMMITTEE:
			return 'ผ่านการพิจารณาโดยคณะกรรมการ';
		default:
			return status;
	}
}

export function getApplicationStatusColor(status: ApplicationStatusValue): string {
	switch (status) {
		case ApplicationStatus.PENDING:
			return 'text-yellow-600';

		case ApplicationStatus.REJECTED:
			return 'text-red-500';

		case ApplicationStatus.APPROVED_BY_DEPARTMENT:
		case ApplicationStatus.APPROVED_BY_ASSOCIATE_DEAN:
		case ApplicationStatus.APPROVED_BY_DEAN:
		case ApplicationStatus.APPROVED_BY_COMMITTEE:
			return 'text-green-600';

		default:
			return 'text-gray-700';
	}
}