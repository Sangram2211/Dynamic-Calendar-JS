document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('2024-07-18');
    const endDate = new Date('2024-11-01');
    const calendar = document.getElementById('calendar');

    const statuses = ['not-available', 'selected', 'booked', 'sold-out'];
    const statusColors = {
        'not-available': 'not-available',
        'selected': 'selected',
        'booked': 'booked',
        'sold-out': 'sold-out',
    };
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day_name', 'header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    const startDay = startDate.getDay();

    const dayMapping = [6, 0, 1, 2, 3, 4, 5];

    for (let i = 0; i < dayMapping[startDay]; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day', 'empty');
        calendar.appendChild(emptyDiv);
    }
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    var not_avail_dates = ['2024-07-20', '2024-07-21', '2024-07-27', '2024-07-28', '2024-08-03', '2024-08-04']
    var sold_out_dates = ['2024-07-22', '2024-07-24', '2024-07-30', '2024-08-04']
    var already_booked_dates = ['2024-07-23', '2024-07-26', '2024-08-15', '2024-08-12']
    var selectedDates = []
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const formattedDate = formatDate(currentDate);
        if (not_avail_dates.includes(formattedDate)) {
            dayDiv.classList.add(statusColors['not-available']);
        } else if (sold_out_dates.includes(formattedDate)) {
            dayDiv.classList.add(statusColors['sold-out']);
        } else if (already_booked_dates.includes(formattedDate)) {
            dayDiv.classList.add(statusColors['booked']);
        } else {
            dayDiv.addEventListener('click', () => {
                if (dayDiv.classList.contains('selected')) {
                    dayDiv.classList.remove('selected');
                    const index = selectedDates.indexOf(formattedDate);
                    if (index > -1) {
                        selectedDates.splice(index, 1);
                        document.getElementById('selected_dates').value = selectedDates;
                    }
                }else if (selectedDates.length < 5) {
                    dayDiv.classList.add('selected');
                    selectedDates.push(formattedDate);
                    document.getElementById('selected_dates').value = selectedDates;
                } 
                else {
                    window.alert('Only 5 Dates are selectable')
                }
//                console.log(selectedDates);
            });
        }
        const dateSpan = document.createElement('div');
        dateSpan.classList.add('date');
        dateSpan.textContent = currentDate.getDate();

        const monthSpan = document.createElement('div');
        monthSpan.classList.add('month');
        monthSpan.textContent = currentDate.toLocaleString('default', {
            month: 'short'
        });
        dayDiv.appendChild(dateSpan);
        dayDiv.appendChild(monthSpan);
        
        calendar.appendChild(dayDiv);
        currentDate.setDate(currentDate.getDate() + 1);
    }
});