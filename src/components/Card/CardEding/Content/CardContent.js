import React from 'react';
import T from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { TextField, SvgIcon, Grid, CardContent } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateRangeIcon from '@material-ui/icons/DateRange';

import { content } from '../styles/cardStyling';
import styles from '../styles/cardEditing.module.css';

const ContentSection = ({
  textValue,
  onChangeText,
  dateValue,
  formatDate,
  onChangeDate,
  questId,
}) => {
  const cardContentStyles = content();
  return (
    <CardContent className={cardContentStyles.cardContentEditing}>
      {!questId && <h3 className={styles.createQuest}>CREATE A NEW QUEST</h3>}
      <TextField
        className={cardContentStyles.textField}
        id="name-quest"
        type="text"
        placeholder="Name your quest"
        label={<p>less than 28 symbols</p>}
        inputProps={{
          value: textValue,
          maxLength: 27,
          onChange: onChangeText,
          classes: {
            input: cardContentStyles.input,
          },
        }}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" className={cardContentStyles.grid}>
          <KeyboardDatePicker
            autoOk
            disableToolbar
            disablePast
            helperText={false}
            variant="inline"
            onChange={onChangeDate}
            labelFunc={() => formatDate(dateValue)}
            format="dd MMMM yyyy"
            margin="normal"
            id="date-picker-inline"
            keyboardIcon={
              <SvgIcon color="secondary">
                <DateRangeIcon />
              </SvgIcon>
            }
            InputProps={{
              disableUnderline: true,
              classes: {
                input: cardContentStyles.input,
              },
            }}
            value={dateValue}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            classes={{
              root: cardContentStyles.formControl,
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </CardContent>
  );
};

ContentSection.propTypes = {
  textValue: T.string,
  onChangeText: T.func.isRequired,
  dateValue: T.instanceOf(Date).isRequired,
  formatDate: T.func.isRequired,
  onChangeDate: T.func.isRequired,
  questId: T.string,
};

export default ContentSection;
