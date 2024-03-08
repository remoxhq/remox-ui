import ReactECharts from "echarts-for-react";
import { EChartsOption, graphic } from "echarts";
import { useMemo, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@components/shadcn/radio-group";
import { Label } from "@components/shadcn/label";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useFetchSingleOrg } from "@/api/useFetchSingleOrg";
import { useFetchPortfolioHistory } from "@/api/useFetchPortfolioHistory";
import SyncLoader from "react-spinners/SyncLoader";
import EmptyCard from "@components/general/emptyCard";

function PortfolioHistory() {
  const { slug } = useParams();
  const { data } = useFetchSingleOrg(slug);
  const { data: portfolioData, isPending, isSuccess, isError, isLoading } = useFetchPortfolioHistory(data?.result.dashboardLink);

  const [chartFilter, setChartFilter] = useState<"7" | "30" | "90" | "365">("7");

  const calculatedData = useMemo(() => {
    const result = {
      "7": [],
      "30": [],
      "90": [],
      "365": [],
    };
    if (portfolioData && !isPending && isSuccess) {
      const rawData = Object.entries(portfolioData?.result.annual);
      Object.keys(result).forEach((key) => {
        result[key] = rawData.slice(Math.max(rawData.length - Number(key), 0)).map(([key, value]) => [key, value.totalTreasury]);
      });
    }
    return result;
  }, [isPending, isSuccess, portfolioData]);

  const portfolioHistory: EChartsOption = {
    tooltip: {
      backgroundColor: "#15202B",
      borderColor: "#384555",
      axisPointer: {
        type: "line",
      },
      textStyle: {
        color: "#F8F8F8",
        fontFamily: "Geist Sans,system-ui",
        fontWeight: "bold",
      },
      trigger: "axis",

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params: any) {
        // eslint-disable-line @typescript-eslint/no-explicit-any
        const formattedDate = dayjs(params[0].data[0]).format("DD-MMM-YYYY");
        let content = formattedDate + "<br/>";
        for (let i = 0; i < params.length; i++) {
          content += '<div style="display: flex; justify-content: space-between; max-width: 200px;font-weight:medium">';
          content += '<div style="padding-right:10px" >' + params[i].marker + params[i].seriesName + "</div>";
          content += Intl.NumberFormat("en", {
            notation: "compact",
            currency: "USD",
            style: "currency",
            maximumFractionDigits: 2,
          }).format(params[i].value[1]);
          content += "</div>";
        }
        return content;
      },
    },
    title: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 10,
        margin: 14,
        align: "center",
        showMinLabel: true,
        interval: chartFilter === "7" ? 0 : chartFilter === "30" ? 3 : chartFilter === "90" ? 9 : "auto",
        formatter(value) {
          if (chartFilter === "7") {
            return dayjs(value).format("ddd");
          }
          if (chartFilter === "30" || chartFilter === "90") {
            return dayjs(value).format("D MMM");
          }
          return dayjs(value).format("MMM,YY");
        },
      },
      boundaryGap: false,
    },
    yAxis: {
      splitNumber: 5,
      type: "value",
      axisLabel: {
        formatter: (value: number) =>
          Intl.NumberFormat("en", {
            notation: "compact",
            currency: "USD",
            style: "currency",
            maximumFractionDigits: 0,
          }).format(value),
        fontSize: 10,
        fontFamily: "Geist Sans,system-ui",
        margin: 12,
      },
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        type: "inside",
        disabled: true,
      },
    ],
    series: [
      {
        name: "Balance:",
        type: "line",
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
        labelLine: {
          smooth: true,
        },
        sampling: "lttb",
        itemStyle: {
          color: "rgba(255, 115, 72, 0.48)",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255, 115, 72, 1)",
            },
            {
              offset: 1,
              color: "rgba(255, 115, 72, 0.1)",
            },
          ]),
        },
        data: calculatedData[chartFilter],
        // markPoint: {
        //   data: events,
        //   symbol: "diamond",
        //   symbolSize: 15,
        //   symbolOffset: [0, -5],
        //   label: {
        //     show: false,
        //   },
        //   itemStyle: {
        //     color: "rgba(255, 115, 72, 1)",
        //     shadowBlur: 1,
        //   },
        //   emphasis: {
        //     disabled: false,
        //     label: {
        //       show: true,
        //       position: "top",
        //       distance: 10,
        //       fontWeight: "600",
        //       fontSize: 14,
        //       color: "rgba(255, 115, 72, 1)",
        //       fontFamily: "Inter Variable,sans-serif",
        //       align: "center",
        //       formatter: "{c}",
        //     },
        //   },
        // },
      },
    ],
    grid: {
      show: false,
      top: "20",
      left: "45",
      right: "5",
      bottom: "30",
    },
    media: [
      {
        query: {
          maxWidth: 640,
        },
        option: {
          yAxis: {
            show: false,
          },
          grid: {
            left: "10",
          },
        },
      },
    ],
    animationEasing: "linear",
    animationDurationUpdate: 0,
    // animationEasingUpdate:"backOut"
  };

  const handleRadioChange = (value: "7" | "30" | "90" | "365") => {
    setChartFilter(value);
  };

  return (
    <div className="bg-darkBlue rounded-xl p-3 w-full h-[360px] border overflow-hidden">
      <h3 className="text-center font-medium text-sm text-whitish">Portfolio History</h3>
      {portfolioData?.result.annual && !isPending && isSuccess && Object.entries(portfolioData?.result.annual).length >= 7 ? (
        <>
          <RadioGroup defaultValue={chartFilter} className="flex items-center justify-center mt-1 xxs:mt-0  xxs:justify-end gap-4" onValueChange={handleRadioChange}>
            <div className="flex items-center">
              <RadioGroupItem value="7" id="week" className="peer hidden" />
              <Label
                htmlFor="week"
                className="text-whitish font-semibold text-xs cursor-pointer peer-data-[state=checked]:text-brand hover:text-brand transition-all ease-in duration-200"
              >
                1W
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="30" id="month" className="peer hidden" />
              <Label
                htmlFor="month"
                className="text-whitish font-semibold text-xs cursor-pointer peer-data-[state=checked]:text-brand hover:text-brand transition-all ease-in duration-200"
              >
                1M
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="90" id="quart" className="peer hidden" />
              <Label
                htmlFor="quart"
                className="text-whitish font-semibold text-xs cursor-pointer peer-data-[state=checked]:text-brand hover:text-brand transition-all ease-in duration-200"
              >
                3M
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="365" id="year" className="peer hidden" />
              <Label
                htmlFor="year"
                className="text-whitish font-semibold text-xs cursor-pointer peer-data-[state=checked]:text-brand hover:text-brand transition-all ease-in duration-200"
              >
                1Y
              </Label>
            </div>
          </RadioGroup>
          <ReactECharts lazyUpdate={true} opts={{ renderer: "svg" }} option={portfolioHistory} className="w-full h-full object-cover" />
        </>
      ) : (portfolioData?.result.annual && !isPending && isSuccess && Object.entries(portfolioData?.result.annual).length < 7) || isError || !isLoading ? (
        <EmptyCard name="portfolio history" />
      ) : (
        <div className="flex justify-center content-center h-[80%] items-center">
          <SyncLoader color="#384555" size={20} />
        </div>
      )}
    </div>
  );
}

export default PortfolioHistory;
