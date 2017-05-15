import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';

import { H1, H2, H3, Level } from '../../components/Heading';
import { Chapter } from '../interfaces';
import { spacing, color } from '../../styles';

interface Props {
  chapter: Chapter;
  mangaTitle: string;
  chapterId: string;
}

const Root = styled.div`
  --text-color: ${Color(color.white).fade(.3).toString()};
  --background-color: ${color.darkBlue};

  align-items: center;
  background: ${color.darkBlue};
  display: flex;
  flex-direction: column;
  padding: ${spacing.large} 0;
`;

const Image = styled.img`
  margin-bottom: ${spacing.large};
  max-height: 100%;
  max-width: 100%;
`;

const MangaName = styled.div`
  width: 100%;
  padding: 0 ${spacing.normal};
  margin-bottom: ${spacing.xlarge};
`;

const MangaChapter = styled(MangaName)`
  margin-bottom: ${spacing.small};
`;

const MangaChapterTitle = styled(MangaName)`
  margin-bottom: ${spacing.xlarge};
`;

const ChapterReader = ({ chapter, chapterId, mangaTitle }: Props) => (
  <Root>
    <MangaName>
      <H1 level={Level.h1}>{mangaTitle}</H1>
    </MangaName>
    <MangaChapter>
      <H3 level={Level.none}>Chapter {chapterId}</H3>
    </MangaChapter>
    <MangaChapterTitle>
      <H2 level={Level.h2}>{chapter.name}</H2>
    </MangaChapterTitle>
    {chapter.pages.map(page => (
      <div key={page.pageId}>
        <Image key={page.pageId} src={page.url} />
      </div>
    ))}
  </Root>
);

export default ChapterReader;
