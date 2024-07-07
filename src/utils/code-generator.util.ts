export function generateRentCode(memberCode: string): string {
    const dateTimeUnix = Math.floor(Date.now() / 1000);
    return `RENT${memberCode}${dateTimeUnix}`;
}