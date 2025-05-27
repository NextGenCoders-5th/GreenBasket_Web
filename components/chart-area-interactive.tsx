'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const description = 'An interactive area chart';

const chartData = [
  { date: '2024-04-01', customers: 222, orders: 150 },
  { date: '2024-04-02', customers: 97, orders: 180 },
  { date: '2024-04-03', customers: 167, orders: 120 },
  { date: '2024-04-04', customers: 242, orders: 260 },
  { date: '2024-04-05', customers: 373, orders: 290 },
  { date: '2024-04-06', customers: 301, orders: 340 },
  { date: '2024-04-07', customers: 245, orders: 180 },
  { date: '2024-04-08', customers: 409, orders: 320 },
  { date: '2024-04-09', customers: 59, orders: 110 },
  { date: '2024-04-10', customers: 261, orders: 190 },
  { date: '2024-04-11', customers: 327, orders: 350 },
  { date: '2024-04-12', customers: 292, orders: 210 },
  { date: '2024-04-13', customers: 342, orders: 380 },
  { date: '2024-04-14', customers: 137, orders: 220 },
  { date: '2024-04-15', customers: 120, orders: 170 },
  { date: '2024-04-16', customers: 138, orders: 190 },
  { date: '2024-04-17', customers: 446, orders: 360 },
  { date: '2024-04-18', customers: 364, orders: 410 },
  { date: '2024-04-19', customers: 243, orders: 180 },
  { date: '2024-04-20', customers: 89, orders: 150 },
  { date: '2024-04-21', customers: 137, orders: 200 },
  { date: '2024-04-22', customers: 224, orders: 170 },
  { date: '2024-04-23', customers: 138, orders: 230 },
  { date: '2024-04-24', customers: 387, orders: 290 },
  { date: '2024-04-25', customers: 215, orders: 250 },
  { date: '2024-04-26', customers: 75, orders: 130 },
  { date: '2024-04-27', customers: 383, orders: 420 },
  { date: '2024-04-28', customers: 122, orders: 180 },
  { date: '2024-04-29', customers: 315, orders: 240 },
  { date: '2024-04-30', customers: 454, orders: 380 },
  { date: '2024-05-01', customers: 165, orders: 220 },
  { date: '2024-05-02', customers: 293, orders: 310 },
  { date: '2024-05-03', customers: 247, orders: 190 },
  { date: '2024-05-04', customers: 385, orders: 420 },
  { date: '2024-05-05', customers: 481, orders: 390 },
  { date: '2024-05-06', customers: 498, orders: 520 },
  { date: '2024-05-07', customers: 388, orders: 300 },
  { date: '2024-05-08', customers: 149, orders: 210 },
  { date: '2024-05-09', customers: 227, orders: 180 },
  { date: '2024-05-10', customers: 293, orders: 330 },
  { date: '2024-05-11', customers: 335, orders: 270 },
  { date: '2024-05-12', customers: 197, orders: 240 },
  { date: '2024-05-13', customers: 197, orders: 160 },
  { date: '2024-05-14', customers: 448, orders: 490 },
  { date: '2024-05-15', customers: 473, orders: 380 },
  { date: '2024-05-16', customers: 338, orders: 400 },
  { date: '2024-05-17', customers: 499, orders: 420 },
  { date: '2024-05-18', customers: 315, orders: 350 },
  { date: '2024-05-19', customers: 235, orders: 180 },
  { date: '2024-05-20', customers: 177, orders: 230 },
  { date: '2024-05-21', customers: 82, orders: 140 },
  { date: '2024-05-22', customers: 81, orders: 120 },
  { date: '2024-05-23', customers: 252, orders: 290 },
  { date: '2024-05-24', customers: 294, orders: 220 },
  { date: '2024-05-25', customers: 201, orders: 250 },
  { date: '2024-05-26', customers: 213, orders: 170 },
  { date: '2024-05-27', customers: 420, orders: 460 },
  { date: '2024-05-28', customers: 233, orders: 190 },
  { date: '2024-05-29', customers: 78, orders: 130 },
  { date: '2024-05-30', customers: 340, orders: 280 },
  { date: '2024-05-31', customers: 178, orders: 230 },
  { date: '2024-06-01', customers: 178, orders: 200 },
  { date: '2024-06-02', customers: 470, orders: 410 },
  { date: '2024-06-03', customers: 103, orders: 160 },
  { date: '2024-06-04', customers: 439, orders: 380 },
  { date: '2024-06-05', customers: 88, orders: 140 },
  { date: '2024-06-06', customers: 294, orders: 250 },
  { date: '2024-06-07', customers: 323, orders: 370 },
  { date: '2024-06-08', customers: 385, orders: 320 },
  { date: '2024-06-09', customers: 438, orders: 480 },
  { date: '2024-06-10', customers: 155, orders: 200 },
  { date: '2024-06-11', customers: 92, orders: 150 },
  { date: '2024-06-12', customers: 492, orders: 420 },
  { date: '2024-06-13', customers: 81, orders: 130 },
  { date: '2024-06-14', customers: 426, orders: 380 },
  { date: '2024-06-15', customers: 307, orders: 350 },
  { date: '2024-06-16', customers: 371, orders: 310 },
  { date: '2024-06-17', customers: 475, orders: 520 },
  { date: '2024-06-18', customers: 107, orders: 170 },
  { date: '2024-06-19', customers: 341, orders: 290 },
  { date: '2024-06-20', customers: 408, orders: 450 },
  { date: '2024-06-21', customers: 169, orders: 210 },
  { date: '2024-06-22', customers: 317, orders: 270 },
  { date: '2024-06-23', customers: 480, orders: 530 },
  { date: '2024-06-24', customers: 132, orders: 180 },
  { date: '2024-06-25', customers: 141, orders: 190 },
  { date: '2024-06-26', customers: 434, orders: 380 },
  { date: '2024-06-27', customers: 448, orders: 490 },
  { date: '2024-06-28', customers: 149, orders: 200 },
  { date: '2024-06-29', customers: 103, orders: 160 },
  { date: '2024-06-30', customers: 446, orders: 400 },
];

const chartConfig = {
  visitors: {
    label: 'Customers',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Customers</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total for the last 3 months</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup type="single" value={timeRange} onValueChange={setTimeRange} variant="outline" className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden" size="sm" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="customers" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
            <Area dataKey="orders" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
