const ACHIEVEMENTS = [
    {
        id: 'obus_fan',
        icon: '🚎',
        requirement: (trips) => trips.filter(t => t.route && t.route.toLowerCase().includes('obus')).length >= 20,
        progress: (trips) => Math.min(20, trips.filter(t => t.route && t.route.toLowerCase().includes('obus')).length),
        total: 20
    },
    {
        id: 's_bahn_pro',
        icon: '🚈',
        requirement: (trips) => trips.filter(t => t.route && t.route.toLowerCase().includes('s-bahn')).length >= 50,
        progress: (trips) => Math.min(50, trips.filter(t => t.route && t.route.toLowerCase().includes('s-bahn')).length),
        total: 50
    },
    {
        id: 'state_hopper',
        icon: '🗺️',
        requirement: (trips) => trips.filter(t => t.states && t.states.length > 1).length >= 10,
        progress: (trips) => Math.min(10, trips.filter(t => t.states && t.states.length > 1).length),
        total: 10
    },
    {
        id: 'salzburg_local',
        icon: '🏔️',
        requirement: (trips) => trips.filter(t => t.states && t.states.includes('Salzburg')).length >= 100,
        progress: (trips) => Math.min(100, trips.filter(t => t.states && t.states.includes('Salzburg')).length),
        total: 100
    },
    {
        id: 'austria_explorer',
        icon: '🇦🇹',
        requirement: (trips) => {
            const uniqueStates = new Set();
            trips.forEach(t => {
                if (t.states) {
                    t.states.forEach(state => uniqueStates.add(state));
                }
            });
            return uniqueStates.size >= 5;
        },
        progress: (trips) => {
            const uniqueStates = new Set();
            trips.forEach(t => {
                if (t.states) {
                    t.states.forEach(state => uniqueStates.add(state));
                }
            });
            return Math.min(5, uniqueStates.size);
        },
        total: 5
    },
    {
        id: 'austria_master',
        icon: '👑',
        requirement: (trips) => {
            const uniqueStates = new Set();
            trips.forEach(t => {
                if (t.states) {
                    t.states.forEach(state => uniqueStates.add(state));
                }
            });
            return uniqueStates.size >= 9;
        },
        progress: (trips) => {
            const uniqueStates = new Set();
            trips.forEach(t => {
                if (t.states) {
                    t.states.forEach(state => uniqueStates.add(state));
                }
            });
            return Math.min(9, uniqueStates.size);
        },
        total: 9
    },
    {
        id: 'route_collector',
        icon: '🧭',
        requirement: (trips) => {
            const uniqueRoutes = new Set();
            trips.forEach(t => {
                if (t.route) {
                    uniqueRoutes.add(t.route.trim().toLowerCase());
                }
            });
            return uniqueRoutes.size >= 15;
        },
        progress: (trips) => {
            const uniqueRoutes = new Set();
            trips.forEach(t => {
                if (t.route) {
                    uniqueRoutes.add(t.route.trim().toLowerCase());
                }
            });
            return Math.min(15, uniqueRoutes.size);
        },
        total: 15
    },
    {
        id: 'wien_hawara',
        icon: '🗣️',
        requirement: (trips) => trips.filter(t => t.route && t.route.toLowerCase().includes('wien')).length >= 3,
        progress: (trips) => Math.min(3, trips.filter(t => t.route && t.route.toLowerCase().includes('wien')).length),
        total: 3
    },
    {
        id: 'linz_swing',
        icon: '💃',
        requirement: (trips) => trips.filter(t => t.route && t.route.toLowerCase().includes('linz')).length >= 3,
        progress: (trips) => Math.min(3, trips.filter(t => t.route && t.route.toLowerCase().includes('linz')).length),
        total: 3
    },
    {
        id: 'graz_boulder',
        icon: '🧗',
        requirement: (trips) => trips.filter(t => t.route && t.route.toLowerCase().includes('graz')).length >= 4,
        progress: (trips) => Math.min(4, trips.filter(t => t.route && t.route.toLowerCase().includes('graz')).length),
        total: 4
    },
    {
        id: 'month_champion',
        icon: '🗓️',
        requirement: (trips) => trips.reduce((sum, t) => sum + (t.distance || 0), 0) >= 500,
        progress: (trips) => Math.min(500, Math.round(trips.reduce((sum, t) => sum + (t.distance || 0), 0))),
        total: 500
    },
    {
        id: 'weekend_warrior',
        icon: '🎉',
        requirement: (trips) => trips.filter(t => {
            const date = new Date(t.date);
            const day = date.getDay();
            return day === 0 || day === 6;
        }).length >= 20,
        progress: (trips) => Math.min(20, trips.filter(t => {
            const date = new Date(t.date);
            const day = date.getDay();
            return day === 0 || day === 6;
        }).length),
        total: 20
    },
    {
        id: 'first_savings',
        icon: '💰',
        requirement: (trips) => {
            const totalCost = trips.filter(t => isValidTrip(t)).reduce((sum, t) => sum + t.cost, 0);
            return totalCost >= userTicketCost;
        },
        progress: (trips) => {
            const totalCost = trips.filter(t => isValidTrip(t)).reduce((sum, t) => sum + t.cost, 0);
            return Math.min(userTicketCost, totalCost);
        },
        total: userTicketCost
    },
    {
        id: 'eco_champion',
        icon: '🌱',
        requirement: (trips) => {
            const totalCost = trips.filter(t => isValidTrip(t)).reduce((sum, t) => sum + t.cost, 0);
            return totalCost - userTicketCost >= 500;
        },
        progress: (trips) => {
            const totalCost = trips.filter(t => isValidTrip(t)).reduce((sum, t) => sum + t.cost, 0);
            const savings = totalCost - userTicketCost;
            return Math.min(500, Math.max(0, savings));
        },
        total: 500
    },
    {
        id: 'century_club',
        icon: '💯',
        requirement: (trips) => trips.filter(t => isValidTrip(t)).length >= 100,
        progress: (trips) => Math.min(100, trips.filter(t => isValidTrip(t)).length),
        total: 100
    }
];

function updateAchievements(trips) {
    const container = document.getElementById('achievementsGrid');
    if (!container) return;

    const unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    const newlyUnlocked = [];

    const html = ACHIEVEMENTS.map(achievement => {
        const isUnlocked = achievement.requirement(trips);
        const progress = achievement.progress(trips);
        const wasUnlocked = unlockedAchievements.includes(achievement.id);

        if (isUnlocked && !wasUnlocked) {
            newlyUnlocked.push(achievement);
        }

        const achievementName = getAchievementName(achievement.id);
        const achievementDesc = getAchievementDescription(achievement.id);
        const progressPercent = (progress / achievement.total * 100).toFixed(0);
        const isMoneyProgress = achievement.id === 'first_savings' || achievement.total === userTicketCost;
        const progressValue = isMoneyProgress ? progress.toFixed(2) : progress;
        const totalValue = isMoneyProgress ? achievement.total.toFixed(2) : achievement.total;
        const progressText = isUnlocked 
            ? '✓ ' + (currentLanguage === 'de' ? 'Erreicht!' : 'Unlocked!')
            : `${progressValue}/${totalValue} (${progressPercent}%)`;

        return `
            <div class="badge ${isUnlocked ? 'unlocked' : 'locked'}" 
                 title="${achievementDesc}">
                <span class="badge-icon">${achievement.icon}</span>
                <div class="badge-name">${achievementName}</div>
                <div class="badge-description">${achievementDesc}</div>
                <div class="badge-progress">${progressText}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;

    if (newlyUnlocked.length > 0) {
        const allUnlocked = [...unlockedAchievements, ...newlyUnlocked.map(a => a.id)];
        localStorage.setItem('unlockedAchievements', JSON.stringify(allUnlocked));

        newlyUnlocked.forEach((achievement, index) => {
            setTimeout(() => {
                const achievementName = getAchievementName(achievement.id);
                const message = currentLanguage === 'de' 
                    ? `🏆 Achievement freigeschaltet: ${achievementName}!`
                    : `🏆 Achievement unlocked: ${achievementName}!`;
                showToast(message, 'success');
            }, index * 500);
        });
    }
}
