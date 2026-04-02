export const USER_POSITION = {
	STUDENT: 'student',
	HEAD_OF_DEPARTMENT: 'head_of_department',
	ASSOCIATE_DEAN: 'associate_dean',
	DEAN: 'dean',
	COMMITTEE_MEMBER: 'committee_member',
	STAFF: 'staff'
} as const;

export type UserPosition = (typeof USER_POSITION)[keyof typeof USER_POSITION];

export const USER_ROLE = {
	STUDENT: 'STUDENT',
	COMMITTEE: 'COMMITTEE',
	ADMIN: 'ADMIN'
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export function getUserPositionLabel(position: UserPosition): string {
	switch (position) {
		case USER_POSITION.DEAN:
			return 'คณบดี';
		case USER_POSITION.ASSOCIATE_DEAN:
			return 'รองคณบดี';
		case USER_POSITION.HEAD_OF_DEPARTMENT:
			return 'หัวหน้าภาควิชา';
		case USER_POSITION.COMMITTEE_MEMBER:
			return 'คณะกรรมการ';
		case USER_POSITION.STUDENT:
			return 'นิสิต';
		case USER_POSITION.STAFF:
			return 'กองพัฒนานิสิต';
		default:
			return 'นิสิต';
	}
}

export function getUserRoleFromPosition(position: UserPosition): UserRole {
	switch (position) {
		case USER_POSITION.STUDENT:
			return USER_ROLE.STUDENT;
		case USER_POSITION.STAFF:
			return USER_ROLE.ADMIN;
		default:
			return USER_ROLE.COMMITTEE;
	}
}
