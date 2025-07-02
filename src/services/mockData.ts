import { AirTagDevice } from '@/types/airtag';

export const generateMockData = (): AirTagDevice[] => [
  {
    id: '1',
    name: 'Chaves do Carro',
    apple_id: 'user@example.com',
    type: 'official',
    last_seen: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
    battery_level: 85,
    accuracy: 5,
    locations: [
      {
        id: '1',
        airtag_id: 'AT001',
        apple_id: 'user@example.com',
        latitude: 37.7749,
        longitude: -122.4194,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        name: 'Chaves do Carro',
        battery_level: 85,
        accuracy: 5,
        type: 'official'
      }
    ]
  },
  {
    id: '2',
    name: 'Mochila',
    apple_id: 'user@example.com',
    type: 'official',
    last_seen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    battery_level: 45,
    accuracy: 10,
    locations: [
      {
        id: '2',
        airtag_id: 'AT002',
        apple_id: 'user@example.com',
        latitude: 37.7849,
        longitude: -122.4094,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        name: 'Mochila',
        battery_level: 45,
        accuracy: 10,
        type: 'official'
      }
    ]
  },
  {
    id: '3',
    name: 'Rastreador Genérico',
    apple_id: 'generic-device',
    type: 'generic',
    last_seen: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    battery_level: 72,
    accuracy: 15,
    locations: [
      {
        id: '3',
        airtag_id: 'GEN001',
        apple_id: 'generic-device',
        latitude: 37.7649,
        longitude: -122.4294,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        name: 'Rastreador Genérico',
        battery_level: 72,
        accuracy: 15,
        type: 'generic'
      }
    ]
  },
  {
    id: '4',
    name: 'Pet Tracker',
    apple_id: 'generic-device',
    type: 'generic',
    last_seen: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
    battery_level: 28,
    accuracy: 20,
    locations: [
      {
        id: '4',
        airtag_id: 'GEN002',
        apple_id: 'generic-device',
        latitude: 37.7549,
        longitude: -122.4394,
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        name: 'Pet Tracker',
        battery_level: 28,
        accuracy: 20,
        type: 'generic'
      }
    ]
  }
];