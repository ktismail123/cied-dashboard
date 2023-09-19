import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject, OnDestroy } from '@angular/core';
import { Chart, TickOptions } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { IActiveLeadsDataResult, ILeadsListDataResult, IProbability, IStageGraphData, IprobabilityData } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user-services/user.service';
import { DashboardData } from '../../data/dashboard';

/**
  * Dashboard Component for displaying user dashboard data.
 * This component manages the display of stage details, lead status, charts, and probabilities.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  /** Instance of UserService for managing user-related data. */
  private userService = inject(UserService);

  /** Holds the stage details data. */
  stageDetails!: IStageGraphData['stage_type_count'];

  /** Holds the graph details data. */
  graphDetails!: IStageGraphData['graph'];

  /** The selected stage type (e.g., 'active', 'won', and 'lost'). */
  selectedStageType = 'active';

  /** Array of active leads details. */
  activeLeadsDetails: IActiveLeadsDataResult[] = [];

  /** Array of leads list data. */
  leadsArrayList: ILeadsListDataResult[] = [];

  /** Holds the probability details data. */
  probability_details!: IprobabilityData;

  /** Array of subscriptions for managing observables. */
  subscripton: Subscription[] = [];

  /** Table head data array. */
  tableHead = DashboardData.tableHeadArray();

  /** Array of probability objects. */
  probabilities: IProbability[] = [];

  /** Search text for leads list. */
  searchText = '';

  /**
   * Initializes the component.
   * Calls functions to fetch stage and graph details, active leads status, leads list, and probabilities.
   */
  ngOnInit(): void {
    this.getStageAndGraphDetails();
    this.getActiveLeadsStatus();
    this.getLeadsList();
    this.getProbability();
  }

  /**
   * Fetches the stage and graph details for the selected stage type.
   */
  getStageAndGraphDetails(): void {
    this.subscripton.push(
      this.userService.graphAndStageCount(this.selectedStageType).subscribe({
        next: (res => {
          if (res.success) {
            this.stageDetails = res.data.stage_type_count;
            this.graphDetails = res.data.graph;
            const labels = res.data.graph.map(item => item.stage_name);
            const leads = res.data.graph.map(item => item.leads);

            this.createChart(labels, leads);
          }
        })
      })
    );
  }

  /**
   * Creates a bar chart using Chart.js library.
   * @param labels - The labels for the chart.
   * @param leads - The leads data for the chart.
   */
  createChart(labels: string[], leads: number[]) {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        // labels: labels,
        labels: ['Contact made', 'Initial interest', 'First intro meeting', 'Follow up meeting', 'Workshop stage'],
        datasets: [{
          data: leads,
          borderWidth: 1,
          label: '',
          barThickness: 30,
          backgroundColor: [
            '#D3DFFB',
            '#A7BFF4',
            '#7C9EF2',
            '#507EEC',
            '#3454CF',
          ],
          barPercentage: 0.5,

        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 30,
            ticks: <TickOptions><unknown>{
              min: 0,
              max: 30,
              stepSize: 10,
            }
          },
        }
      }
    });
  }

  /**
 * Fetches active leads status data from the UserService and updates activeLeadsDetails.
 */
  getActiveLeadsStatus(): void {
    this.subscripton.push(
      this.userService.activeLeadStatus().subscribe({
        next: (res => {
          this.activeLeadsDetails = res.data.results;
        })
      })
    );
  }

  /**
   * Fetches leads list data from the UserService based on selectedStageType and updates leadsArrayList.
   */
  getLeadsList(): void {
    this.subscripton.push(
      this.userService.leadsList(this.selectedStageType, 10, 0, '').subscribe({
        next: (res => {
          this.leadsArrayList = res.data.results;
        })
      })
    );
  }

  /**
 * Categorizes a numerical value into a string label ('Low', 'Medium', 'High', or 'Invalid').
 * @param value - The numerical value to categorize.
 * @returns The categorized label.
 */
  categorizeValue(value: number): string {
    if (value >= 0 && value <= 24) {
      return 'Low';
    } else if (value >= 25 && value <= 49) {
      return 'Medium';
    } else if (value >= 50 && value <= 99) {
      return 'High';
    } else {
      return 'Invalid';
    }
  }

  /**
 * Generates styles for displaying probability value based on a status range.
 * @param value - The probability value to determine the style for.
 * @returns The CSS styles for background-color and color.
 */
  getProbabilityStyles(value: number) {
    class StatusColor {
      mediumBgColor = '#F9D8F8';
      mediumColor = '#853282';
      lowBgColor = '#F8CDD9';
      lowColor = '#8E4358';
      highBgColor = '#C9ECDC';
      highColor = '#3C7E60';
    }
    const statusColor = new StatusColor();

    if (value >= 0 && value <= 24) {
      return {
        'background-color': statusColor.lowBgColor,
        'color': statusColor.lowColor
      };
    } else if (value >= 25 && value <= 49) {
      return {
        'background-color': statusColor.mediumBgColor,
        'color': statusColor.mediumColor
      };
    } else if (value >= 50 && value <= 99) {
      return {
        'background-color': statusColor.highBgColor,
        'color': statusColor.highColor
      };
    } else {
      return
      { }; // Handle the case for 'Invalid' as needed
    }

  }

  /**
 * Fetches probability data from the UserService based on selectedStageType and updates probabilities and probability_details.
 */
  getProbability(): void {
    this.subscripton.push(
      this.userService.getProbalities(this.selectedStageType).subscribe({
        next: (res => {
          this.probability_details = res.data;
          this.probabilities = this.convertToProbabilities(res.data);
        })
      })
    )
  }

  /**
 * Converts probability data to an array of IProbability objects.
 * @param data - The probability data to convert.
 * @returns An array of IProbability objects.
 */
  convertToProbabilities(data: any): any[] {
    const probabilities = [];

    const high = data.high_percent || 0;
    const medium = data.medium_percent || 0;
    const low = data.low_percent || 0;

    probabilities.push({
      perc: `${high}%`,
      title: 'High probability to win',
      count: data.high_count.toString().padStart(2, '0'),
      color: '#C9ECDC'
    });

    probabilities.push({
      perc: `${medium}%`,
      title: 'Medium probability to win',
      count: data.medium_count.toString().padStart(2, '0'),
      color: '#F9D8F8'
    });

    probabilities.push({
      perc: `${low}%`,
      title: 'Low probability to win',
      count: data.low_count.toString().padStart(2, '0'),
      color: '#F8CDD9'
    });

    return probabilities;
  }


  /**
   * Changes the selected stage type and updates the stage and graph details.
   * @param stageType - The new selected stage type.
   */
  changeStageType(stageType: string): void {
    this.selectedStageType = stageType;
    this.getStageAndGraphDetails();
  }

  /**
 * Unsubscribes from all subscriptions when the component is destroyed.
 */
  ngOnDestroy(): void {
    this.subscripton.forEach(el => { el.unsubscribe() });
  }

}
