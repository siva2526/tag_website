/**
 * Calendar utilities for TAG Club events (Google Calendar & .ics export)
 */

interface CalendarEventData {
  title: string;
  fullDate: string;
  description: string;
  link?: string;
  location?: string;
}

/**
 * Approximate a date string into ISO-like YYYYMMDD format for calendar imports.
 * Defaults to current year and safe daylight window (10:00 AM - 1:00 PM IST).
 */
function parseDateForCalendar(dateStr: string): { startIso: string; endIso: string } {
  const currentYear = new Date().getFullYear();
  const months: Record<string, string> = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
  };

  let year = currentYear;
  const yearMatch = dateStr.match(/\b(202\d)\b/);
  if (yearMatch) year = parseInt(yearMatch[1], 10);

  let month = '03';
  const monthMatch = dateStr.toLowerCase().match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/);
  if (monthMatch && months[monthMatch[1]]) {
    month = months[monthMatch[1]];
  }

  let day = '15';
  const dayMatch = dateStr.match(/\b([1-9]|[12]\d|3[01])\b/);
  if (dayMatch) {
    day = dayMatch[1].padStart(2, '0');
  }

  const startIso = `${year}${month}${day}T100000Z`;
  const endIso = `${year}${month}${day}T130000Z`;

  return { startIso, endIso };
}

/**
 * Generate a direct Google Calendar event creation URL
 */
export function getGoogleCalendarUrl(event: CalendarEventData): string {
  const { startIso, endIso } = parseDateForCalendar(event.fullDate);
  const title = encodeURIComponent(`[TAG Club] ${event.title}`);
  const details = encodeURIComponent(
    `${event.description}\n\nDiscord & Updates: ${event.link || 'https://discord.com/invite/Y9cpqdvZE4'}`
  );
  const location = encodeURIComponent(event.location || 'VIT Vellore / Discord Guild');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

/**
 * Generate and download an iCalendar (.ics) file
 */
export function downloadIcsFile(event: CalendarEventData): void {
  const { startIso, endIso } = parseDateForCalendar(event.fullDate);
  const cleanTitle = event.title.replace(/[,;]/g, '');
  const cleanDesc = event.description.replace(/[\n\r]/g, ' ').replace(/[,;]/g, '');
  const location = event.location || 'VIT Vellore / Discord Guild';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TAG Club VIT//Guild Quests//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:tag-${Date.now()}@tagclub.vit.ac.in`,
    `DTSTAMP:${startIso}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:[TAG Club] ${cleanTitle}`,
    `DESCRIPTION:${cleanDesc} - Link: ${event.link || 'https://discord.com/invite/Y9cpqdvZE4'}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TAG_${cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
