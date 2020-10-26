import { Injectable } from '@angular/core'

@Injectable()
export class ArchiveService {
  private _archive = [
    {
      'timestamp': '2020-06-15T15:11:06.774Z',
      'Месяц': 'март 2020',
      'Счётчик хол. воды': 296,
      'Расход хол. воды за месяц': 6,
      'Стоимость хол. воды': 22.9,
      'Итого за хол. воду': 137.39,
      'Счётчик гор. воды': 160,
      'Расход гор. воды за месяц': 4,
      'Стоимость гор. воды': 186.23,
      'Итого за гор. воду': 744.92,
      'Стоимость отведения': 28.21,
      'Итого за отведение': 282.1,
      'Счётчик эл. энергии': 13836,
      'Расход эл. энергии за месяц': 149,
      'Стоимость эл. энергии': 3.89,
      'Итого за электроснабжение': 579.61,
      'Итого': 1744.02
    },
    {
      'timestamp': '2020-06-15T15:15:34.537Z',
      'Месяц': 'апрель 2020',
      'Счётчик хол. воды': 303,
      'Расход хол. воды за месяц': 7,
      'Стоимость хол. воды': 22.9,
      'Итого за хол. воду': 160.29,
      'Счётчик гор. воды': 164,
      'Расход гор. воды за месяц': 4,
      'Стоимость гор. воды': 186.23,
      'Итого за гор. воду': 744.92,
      'Стоимость отведения': 28.21,
      'Итого за отведение': 310.31,
      'Счётчик эл. энергии': 13982,
      'Расход эл. энергии за месяц': 146,
      'Стоимость эл. энергии': 3.89,
      'Итого за электроснабжение': 567.94,
      'Итого': 1783.46
    },
    {
      'timestamp': '2020-06-15T15:16:57.991Z',
      'Месяц': 'май 2020',
      'Счётчик хол. воды': 310,
      'Расход хол. воды за месяц': 7,
      'Стоимость хол. воды': 22.9,
      'Итого за хол. воду': 160.29,
      'Счётчик гор. воды': 168,
      'Расход гор. воды за месяц': 4,
      'Стоимость гор. воды': 186.23,
      'Итого за гор. воду': 744.92,
      'Стоимость отведения': 28.21,
      'Итого за отведение': 310.31,
      'Счётчик эл. энергии': 14129,
      'Расход эл. энергии за месяц': 147,
      'Стоимость эл. энергии': 3.89,
      'Итого за электроснабжение': 571.83,
      'Итого': 1787.35
    },
    {
      'timestamp': '2020-07-14T14:01:03.216Z',
      'Месяц': 'июнь 2020',
      'Счётчик хол. воды': 317,
      'Расход хол. воды за месяц': 7,
      'Стоимость хол. воды': 22.9,
      'Итого за хол. воду': 160.29,
      'Счётчик гор. воды': 171,
      'Расход гор. воды за месяц': 3,
      'Стоимость гор. воды': 186.23,
      'Итого за гор. воду': 558.68,
      'Стоимость отведения': 28.21,
      'Итого за отведение': 282.1,
      'Счётчик эл. энергии': 14270,
      'Расход эл. энергии за месяц': 141,
      'Стоимость эл. энергии': 3.89,
      'Итого за электроснабжение': 548.49,
      'Итого': 1549.56
    },
    {
      'timestamp': '2020-08-15T12:27:49.402Z',
      'Месяц': 'июль 2020',
      'Счётчик хол. воды': 324,
      'Расход хол. воды за месяц': 7,
      'Стоимость хол. воды': 23.9,
      'Итого за хол. воду': 167.3,
      'Счётчик гор. воды': 175,
      'Расход гор. воды за месяц': 4,
      'Стоимость гор. воды': 189.42,
      'Итого за гор. воду': 757.68,
      'Стоимость отведения': 29.09,
      'Итого за отведение': 319.99,
      'Счётчик эл. энергии': 14406,
      'Расход эл. энергии за месяц': 136,
      'Стоимость эл. энергии': 4.01,
      'Итого за электроснабжение': 545.36,
      'Итого': 1790.33
    },
    {
      'timestamp': '2020-09-15T13:30:42.306Z',
      'Месяц': 'август 2020',
      'Счётчик хол. воды': 330,
      'Расход хол. воды за месяц': 6,
      'Стоимость хол. воды': 23.9,
      'Итого за хол. воду': 143.39,
      'Счётчик гор. воды': 180,
      'Расход гор. воды за месяц': 5,
      'Стоимость гор. воды': 189.42,
      'Итого за гор. воду': 947.09,
      'Стоимость отведения': 29.09,
      'Итого за отведение': 319.99,
      'Счётчик эл. энергии': 14530,
      'Расход эл. энергии за месяц': 124,
      'Стоимость эл. энергии': 4.01,
      'Итого за электроснабжение': 497.23,
      'Итого': 1907.7
    },
    {
      'timestamp': '2020-10-12T21:08:17.646Z',
      'Месяц': 'сентябрь 2020',
      'Счётчик хол. воды': 335,
      'Расход хол. воды за месяц': 5,
      'Стоимость хол. воды': 23.9,
      'Итого за хол. воду': 119.5,
      'Счётчик гор. воды': 182,
      'Расход гор. воды за месяц': 2,
      'Стоимость гор. воды': 189.42,
      'Итого за гор. воду': 378.84,
      'Стоимость отведения': 29.09,
      'Итого за отведение': 203.63,
      'Счётчик эл. энергии': 14624,
      'Расход эл. энергии за месяц': 94,
      'Стоимость эл. энергии': 4.01,
      'Итого за электроснабжение': 376.94,
      'Итого': 1078.91
    }
  ]

  getArchive() {
    return this._archive
  }
}
