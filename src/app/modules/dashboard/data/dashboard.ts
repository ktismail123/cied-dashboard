
export class DashboardData {
    static tableHeadArray(): { head: string }[] {
        return [
            { head: 'Lead name' },
            { head: 'Date added' },
            { head: 'Current state' },
            { head: 'Probability' },
            { head: 'Team size' },
            { head: 'Location' },
            { head: 'Revenue' },
            { head: 'Catogory' },
        ]
    };
}