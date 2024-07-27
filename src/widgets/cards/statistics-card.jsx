import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer }) {
  return (
    <Card className="shadow-lg rounded-lg flex flex-col p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-900 to-yellow-400 text-white">
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <Typography variant="h6" color="white">
          {title}
        </Typography>
        <Typography variant="h4" className="mt-2">
          {value}
        </Typography>
      </div>
      <div className="ml-4">{icon}</div>
    </div>
  </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
