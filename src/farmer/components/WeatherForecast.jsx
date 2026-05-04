import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { API_URL } from "../../utils/constants";

import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const getDayLabel = (date, index) => {
  if (index === 0) return "Today";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(date));
};

const getWeatherIcon = (code) => {
  if ([0, 1].includes(code)) return <WbSunnyIcon />;
  if ([61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
    return <WaterDropIcon />;
  }
  return <CloudIcon />;
};

const WeatherMetric = ({ icon, label, value }) => {
  return (
    <div className=" rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border px-4 py-3">
      <div className="flex items-center gap-2 text-brand-500">{icon}</div>
      <p className="mt-2 text-xs font-ui text-light-text2 dark:text-dark-text2">
        {label}
      </p>
      <p className="mt-1 text-base font-heading font-semibold text-light-text dark:text-dark-text">
        {value}
      </p>
    </div>
  );
};

const WeatherForecast = () => {
  const farmer = useSelector((store) => store.user?.farmer);
  const token = localStorage.getItem("token");

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const defaultLocation = useMemo(() => {
    return farmer?.farmer_village || "";
  }, [farmer]);

  const fetchWeather = useCallback(async ({ place = "", latitude, longitude } = {}) => {
    try {
      const requestedLocation = place.trim();
      const hasCoordinates = latitude && longitude;
      if (!requestedLocation && !hasCoordinates) {
        setStatus({
          type: "error",
          message:
            "Please allow location access or enter your village, town, or city for weather updates.",
        });
        return;
      }

      if (!API_URL) {
        setStatus({
          type: "error",
          message: "API URL is missing. Please set VITE_API_URL in frontend .env.",
        });
        return;
      }

      setIsLoading(true);
      setStatus(null);

      const params = new URLSearchParams();
      if (hasCoordinates) {
        params.set("latitude", String(18.3496));
        params.set("longitude", String(83.6757));
      } else {
        params.set("location", requestedLocation);
      }

      const url = `${API_URL}/api/weather/forecast${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          "Weather API returned an invalid response. Please check backend server and VITE_API_URL."
        );
      }

      const jsonResponse = await response.json();
      if (!response.ok) {
        throw new Error(
          jsonResponse?.message || "Failed to fetch weather forecast."
        );
      }

      setWeather(jsonResponse?.data);
      setLocation(hasCoordinates ? "Current Location" : requestedLocation);
    } catch (error) {
      setWeather(null);
      setStatus({
        type: "error",
        message: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather({ place: searchLocation });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus({
        type: "error",
        message: "Location permission is not supported in this browser.",
      });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setIsLoading(false);
        setStatus({
          type: "error",
          message:
            error.code === error.PERMISSION_DENIED
              ? "Location permission was denied. You can search by village or town instead."
              : "Unable to read your current location. Please try again or search manually.",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10 * 60 * 1000,
      }
    );
  };

  const resolvedLocation = weather?.location
    ? [weather.location.name, weather.location.region]
        .filter(Boolean)
        .join(", ")
    : location || defaultLocation;

  return (
    <section className="w-full max-w-5xl mx-auto py-6 mb-16 md:ml-64 md:pr-4 lg:pr-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-ui text-brand-500">Farmer Weather</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-heading font-bold text-light-text dark:text-dark-text">
            Weather Forecast
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-body text-light-text2 dark:text-dark-text2">
            Allow location access or search your village to get field
            advisories.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row md:max-w-md">
          <input
            value={searchLocation}
            onChange={(event) => setSearchLocation(event.target.value)}
            placeholder={defaultLocation || "Enter village, town, or city"}
            className="min-h-11 flex-1 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-3 text-sm text-light-text dark:text-dark-text outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-brand-500 px-4 font-ui text-sm font-medium text-white transition hover:bg-brand-600 flex items-center justify-center gap-2">
            <SearchIcon fontSize="small" />
            Search
          </button>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="min-h-11 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 font-ui text-sm font-medium text-light-text dark:text-dark-text transition hover:bg-light-bg dark:hover:bg-dark-bg flex items-center justify-center gap-2">
            <MyLocationIcon fontSize="small" />
            Use Location
          </button>
        </form>
      </div>

      {!weather && !isLoading && !status && (
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-5 py-6">
          <div className="max-w-2xl">
            <h2 className="text-lg font-heading font-bold text-light-text dark:text-dark-text">
              Choose location for weather updates
            </h2>
            <p className="mt-2 text-sm font-body text-light-text2 dark:text-dark-text2">
              Allow location permission for nearby weather updates, or search
              your village, town, or nearby city manually.
            </p>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="mt-4 mr-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-ui font-medium text-white hover:bg-brand-600">
              <MyLocationIcon fontSize="small" />
              Allow location access
            </button>
            {defaultLocation && (
              <button
                type="button"
                onClick={() => {
                  setSearchLocation(defaultLocation);
                  fetchWeather({ place: defaultLocation });
                }}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-light-border dark:border-dark-border px-4 text-sm font-ui font-medium text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg">
                <SearchIcon fontSize="small" />
                Use my village: {defaultLocation}
              </button>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 py-5 text-sm text-light-text2 dark:text-dark-text2">
          Loading weather forecast...
        </div>
      )}

      {status?.type === "error" && (
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-600 sm:flex-row sm:items-center sm:justify-between">
          <span>{status.message}</span>
          <button
            type="button"
            onClick={() => fetchWeather({ place: location || searchLocation })}
            className="inline-flex items-center gap-2 text-xs font-medium underline hover:opacity-80">
            <RefreshIcon fontSize="small" />
            Retry
          </button>
        </div>
      )}

      {!isLoading && !status && !weather && (
        <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 py-5 text-sm text-light-text2 dark:text-dark-text2">
          No weather forecast available.
        </div>
      )}

      {!isLoading && weather && (
        <div className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
            <div className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-ui text-light-text2 dark:text-dark-text2">
                    {resolvedLocation}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
                      <span className="text-4xl">
                        {getWeatherIcon(weather.current.weather_code)}
                      </span>
                    </div>
                    <div>
                      <p className="text-5xl font-heading font-bold text-light-text dark:text-dark-text">
                        {weather.current.temperature} <sup>°</sup>C
                      </p>
                      <p className="mt-1 text-sm font-body text-light-text2 dark:text-dark-text2">
                        {weather.current.condition}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-brand-500/10 px-4 py-3 text-brand-500">
                  <p className="text-xs font-ui">Today</p>
                  <p className="mt-1 text-sm font-heading font-semibold">
                    {weather.today.temperature_min} C -{" "}
                    {weather.today.temperature_max} C
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <WeatherMetric
                  icon={<WaterDropIcon fontSize="small" />}
                  label="Rain Chance"
                  value={`${weather.today.rain_chance}%`}
                />
                <WeatherMetric
                  icon={<CloudIcon fontSize="small" />}
                  label="Rainfall"
                  value={`${weather.today.precipitation_mm} mm`}
                />
                <WeatherMetric
                  icon={<DeviceThermostatIcon fontSize="small" />}
                  label="Humidity"
                  value={`${weather.current.humidity}%`}
                />
                <WeatherMetric
                  icon={<AirIcon fontSize="small" />}
                  label="Wind"
                  value={`${weather.current.wind_speed_kmh} km/h`}
                />
              </div>
            </div>

            <div className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-5">
              <div className="flex items-center gap-2">
                <WarningAmberIcon className="text-brand-500" />
                <h2 className="text-lg font-heading font-bold text-light-text dark:text-dark-text">
                  Farm Advisory
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {weather.advisory?.length > 0 ? (
                  weather.advisory.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border px-4 py-3">
                      <p className="font-ui text-sm font-semibold text-light-text dark:text-dark-text">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm font-body text-light-text2 dark:text-dark-text2">
                        {item.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-light-text2 dark:text-dark-text2">
                    No special advisory for today.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-heading font-bold text-light-text dark:text-dark-text">
                Next 7 Days
              </h2>
              <span className="text-xs font-ui text-light-text2 dark:text-dark-text2">
                Source: {weather.provider}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {weather.forecast.map((day, index) => (
                <div
                  key={day.date}
                  className="rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg px-4 py-4">
                  <div className="flex items-center justify-between gap-2 lg:flex-col lg:items-start">
                    <p className="text-sm font-ui font-semibold text-light-text dark:text-dark-text">
                      {getDayLabel(day.date, index)}
                    </p>
                    <span className="text-brand-500">
                      {getWeatherIcon(day.weather_code)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-light-text2 dark:text-dark-text2">
                    {day.condition}
                  </p>
                  <p className="mt-2 text-sm font-heading font-semibold text-light-text dark:text-dark-text">
                    {day.temperature_min} C - {day.temperature_max} C
                  </p>
                  <div className="mt-3 space-y-1 text-xs font-body text-light-text2 dark:text-dark-text2">
                    <p>Rain Chance: {day.rain_chance}%</p>
                    <p>Rainfall: {day.precipitation_mm} mm</p>
                    <p>Wind: {day.wind_speed_kmh} km/h</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WeatherForecast;
