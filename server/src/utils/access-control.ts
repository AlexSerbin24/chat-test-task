export function isUserOwner(userId: string, ownerId: string): boolean {
    return userId === ownerId;
}