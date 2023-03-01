import React from "react";
import { Tabs, Box, Tab, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CarouselItem from "../../pages/Home/component/CarouselItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pl: 2, py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function CustomizeTab({ data, variant = "standard" }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{
            padding: "0 16px",
            borderWidth: "3px",
            "&& .Mui-selected": {
              backgroundColor: "transparent",
            },
            "&& .MuiTabs-indicator": {
              height: "3px",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant={variant}
        >
          {data.map((item, index) => (
            <Tab
              key={index}
              sx={{
                borderRadius: "8px",
                color: "#b0b3b8",
                margin: "5px 0",
                minHeight: "60px",
                maxHeight: "60px",
                padding: 0,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              icon={item.label.icon}
              iconPosition={item.label.position}
              label={item.label.name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {data.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          <CarouselItem data={item.data} type={item.type} />
        </TabPanel>
      ))}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
